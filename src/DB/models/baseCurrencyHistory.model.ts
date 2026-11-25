import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { SharedCurrencyEnum } from 'src/common/enum';
import { IBaseCurrencyHistory } from 'src/common/interface';

export type HBaseCurrencyHistoryDocument = HydratedDocument<IBaseCurrencyHistory>;
@Schema({
  timestamps: true,
  strict: true,
  strictQuery: true,
})
export class BaseCurrencyHistory implements Partial<IBaseCurrencyHistory> {
  @Prop({type: String,required: true,enum: SharedCurrencyEnum,immutable: true,})
  oldBaseCurrency!: SharedCurrencyEnum;

  @Prop({type: String,required: true,enum: SharedCurrencyEnum,immutable: true,})
  newBaseCurrency!: SharedCurrencyEnum;

  @Prop({type: Types.Decimal128,required: true,immutable: true,})
  conversionRate!: Types.Decimal128;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, immutable: true,})
  changedBy!: Types.ObjectId;
}

export const BaseCurrencyHistorySchema =
  SchemaFactory.createForClass(BaseCurrencyHistory);

export const BaseCurrencyHistoryModel = MongooseModule.forFeature([
  {
    name: BaseCurrencyHistory.name,
    schema: BaseCurrencyHistorySchema,
  },
]);
