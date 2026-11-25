import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { IProductVariantCost } from "src/common/interface";
import { ProductVariantCost } from '../models';

@Injectable()
export class ProductVariantCostRepository extends BaseRepository<IProductVariantCost>{
    constructor(@InjectModel(ProductVariantCost.name) protected readonly model : Model<IProductVariantCost>){
        super(model)
    }
}