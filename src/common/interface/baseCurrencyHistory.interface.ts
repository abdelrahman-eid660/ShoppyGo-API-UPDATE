
import { Types } from 'mongoose';
import { SharedCurrencyEnum } from 'src/common/enum';

export interface IBaseCurrencyHistory {
  oldBaseCurrency: SharedCurrencyEnum;

  newBaseCurrency: SharedCurrencyEnum;

  conversionRate: Types.Decimal128;

  changedBy: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}
