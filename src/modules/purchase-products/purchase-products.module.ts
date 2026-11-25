import { Module } from '@nestjs/common';
import { PurchaseProductsService } from './purchase-products.service';
import { PurchaseProductsController } from './purchase-products.controller';
import {
  FinancialReviewModel,
  InventoryModel,
  InventoryMovementModel,
  ProductSupplierModel,
  ProductVariantCostModel,
  PurchaseProductsModel,
  SettingsModel,
  SupplierModel,
  WareHouseModel,
} from 'src/DB/models';
import {
  FinancialReviewRepository,
  InventoryMovementRepository,
  InventoryRepository,
  ProductSupplierRepository,
  PurchaseProductsRepository,
  SettingsRepository,
  SupplierRepository,
  WareHouseRepository,
  ProductVariantCostRepository,
} from 'src/DB/Repository';
import { SharedAuthenticationModule } from 'src/common/modules';
import { DataBaseModule } from 'src/DB/service';
import {
  AdjustStockService,
  InventoryMovementService,
  ProductCostService,
} from 'src/common/service';
import { PurchaseProductsResolver } from './purchase-products.resolver';

@Module({
  imports: [
    InventoryModel,
    SupplierModel,
    WareHouseModel,
    PurchaseProductsModel,
    InventoryMovementModel,
    SharedAuthenticationModule,
    ProductSupplierModel,
    FinancialReviewModel,
    SettingsModel,
    ProductVariantCostModel,
    DataBaseModule,
  ],
  controllers: [PurchaseProductsController],
  providers: [
    PurchaseProductsService,
    InventoryRepository,
    WareHouseRepository,
    InventoryMovementRepository,
    SupplierRepository,
    PurchaseProductsRepository,
    ProductSupplierRepository,
    InventoryMovementService,
    SettingsRepository,
    FinancialReviewRepository,
    ProductVariantCostRepository,
    AdjustStockService,
    ProductCostService,
    PurchaseProductsResolver,
  ],
  exports: [PurchaseProductsService],
})
export class PurchaseProductsModule {}
