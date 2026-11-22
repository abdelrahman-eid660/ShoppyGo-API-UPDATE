import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { IBaseCurrencyHistory } from "src/common/interface";
import { BaseCurrencyHistory } from '../models';

@Injectable()
export class BaseCurrencyHistoryRepository extends BaseRepository<IBaseCurrencyHistory>{
    constructor(@InjectModel(BaseCurrencyHistory.name) protected readonly model : Model<IBaseCurrencyHistory>){
        super(model)
    }
}