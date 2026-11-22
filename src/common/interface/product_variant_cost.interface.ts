
import { Types } from 'mongoose';
import { SharedCurrencyEnum } from '../enum';

export interface IProductVariantCost {
  _id: Types.ObjectId;

  productVariantId: Types.ObjectId;
  
  totalQuantity: number;
  totalValue: Types.Decimal128;
  averageCost: Types.Decimal128;

  baseCurrency: SharedCurrencyEnum;

  createdAt: Date;
  updatedAt: Date;
}
