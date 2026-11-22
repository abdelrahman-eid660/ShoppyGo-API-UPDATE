
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { SharedCurrencyEnum } from 'src/common/enum';
import { IProductVariantCost } from 'src/common/interface';

export type HProductVariantCostDocument =
  HydratedDocument<IProductVariantCost>;

@Schema({
  timestamps: true,
  optimisticConcurrency: true,
  strict: true,
  strictQuery : true
})
export class ProductVariantCost implements Partial<IProductVariantCost> {

  @Prop({type: Types.ObjectId,ref: 'ProductVariant',required: true , index : true , unique : true})
  productVariantId!: Types.ObjectId;

  @Prop({ type: Number, required: true, default: 0, min: 0,
    validate: {
      validator: Number.isInteger,
      message: 'Total quantity must be an integer',
    },
  })
  totalQuantity!: number;

  @Prop({type: Types.Decimal128,required: true,default: '0'})
  totalValue!: Types.Decimal128;

  @Prop({type: Types.Decimal128,required: true,default: '0'})
  averageCost!: Types.Decimal128;

  @Prop({ type: String, enum: SharedCurrencyEnum, required: true})
  baseCurrency!: SharedCurrencyEnum;
  @Prop({type : Date})
  createdAt?: Date | undefined;
  @Prop({type : Date})
  updatedAt?: Date | undefined;
}

export const ProductVariantCostSchema = SchemaFactory.createForClass(ProductVariantCost);

export const ProductVariantCostModel = MongooseModule.forFeature([
  {
    name: ProductVariantCost.name,
    schema: ProductVariantCostSchema,
  },
]);
