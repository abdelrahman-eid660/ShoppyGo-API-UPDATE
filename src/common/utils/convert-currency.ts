/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ICurrencyItem, ISettings } from "../interface";
import { SharedCurrencyEnum } from "../enum";


export const convertAmountToBaseCurrency = (amount: number,currency: SharedCurrencyEnum,settings: ISettings): number => {
  if (settings.baseCurrency === currency) {
    return amount;
  }
  const currencyRate = settings.currencies?.find((item : ICurrencyItem) => item.code === currency);
  if (!currencyRate ||!Number(currencyRate.exchangeRate) ||currencyRate.exchangeRate <= 0) {
    throw new NotFoundException(`Exchange rate not found for currency ${currency}`);
  }
  return amount * currencyRate.exchangeRate;
};
