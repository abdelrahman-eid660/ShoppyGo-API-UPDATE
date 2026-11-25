
import {BadRequestException,ConflictException,Injectable} from '@nestjs/common';
import {ClientSession,PipelineStage,Types} from 'mongoose';
import { SharedCurrencyEnum } from 'src/common/enum';
import { ProductVariantCostRepository } from 'src/DB/Repository';

@Injectable()
export class ProductCostService {
  constructor(private readonly productVariantCostRepository: ProductVariantCostRepository) {}

  async addReceivedStockCost({productVariantId,receivedQuantity,unitCost,baseCurrency,session}: {productVariantId: Types.ObjectId;receivedQuantity: number;unitCost: Types.Decimal128;baseCurrency: SharedCurrencyEnum;session: ClientSession}): Promise<void> {
    if (!Number.isInteger(receivedQuantity) || receivedQuantity <= 0) {
      throw new BadRequestException('Received quantity must be a positive integer');
    }

    const numericUnitCost = Number(unitCost.toString());

    if (!Number.isFinite(numericUnitCost) || numericUnitCost < 0) {
      throw new BadRequestException('Unit cost must be a valid non-negative number');
    }
    const existingCost = await this.productVariantCostRepository.findOne({filter: { productVariantId },options: { session }});

    if (existingCost && existingCost.baseCurrency !== baseCurrency) {
      throw new ConflictException(
        'Product variant cost currency does not match the current base currency',
      );
    }

    const quantityDecimal = Types.Decimal128.fromString(receivedQuantity.toString());

    const zeroDecimal = Types.Decimal128.fromString('0');

    const pipeline : PipelineStage[] = [
        {
            $set : {
                productVariantId : {
                    $ifNull : ['$productVariantId' , {$literal : productVariantId}]
                },
                baseCurrency : {
                    $ifNull : ['$baseCurrency' , {$literal : baseCurrency}]
                },
                totalQuantity : {
                    $add : [
                        {$ifNull : ['$totalQuantity' , 0]},
                        {$literal : receivedQuantity}
                    ]
                },
                totalValue : {
                    $add : [
                        {$ifNull : ['$totalValue' , {$literal : zeroDecimal}]},
                        {
                            $multiply : [
                                {$literal : unitCost},
                                {$literal : quantityDecimal}
                            ]
                        }
                    ]
                }
            }
        },
        {
            $set :{
                averageCost : {
                    $cond : [
                        {$gt : ['$totalQuantity' , 0]},
                        {$divide : ['$totalValue' , '$totalQuantity']},
                        {$literal : zeroDecimal}
                    ]
                }
            }
        }
    ]

    try {
      await this.productVariantCostRepository.updateOne({filter: { productVariantId , baseCurrency} , update: pipeline , options: {session,upsert: true}});
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 11000) {
        throw new ConflictException('Concurrent product cost initialization detected. Retry the transaction.');
      }
      throw error;
    }
  }

}
