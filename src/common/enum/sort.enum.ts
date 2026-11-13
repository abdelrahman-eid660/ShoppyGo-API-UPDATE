export enum SortEnum {
  NEWEST = "NEWEST",
  OLDEST = "OLDEST",
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
  CODE_ASC = "CODE_ASC",
  CODE_DESC = "CODE_DESC",
  PRICE_ASC = "PRICE_ASC",
  PRICE_DESC = "PRICE_DESC",
  REVIEW_ASC = "REVIEW_ASC",
  REVIEW_DESC = "REVIEW_DESC",
  DISCOUNTAMOUNT_ASC = "DISCOUNTAMOUNT_ASC",
  DISCOUNTAMOUNT_DESC = "DISCOUNTAMOUNT_DESC",
  REFUND_AMOUNT_ASC = "REFUND_AMOUNT_ASC",
  REFUND_AMOUNT_DESC = "REFUND_AMOUNT_DESC",
  COUPON_VALUE_ASC = "COUPON_VALUE_ASC",
  COUPON_VALUE_DESC = "COUPON_VALUE_DESC",
  MINORDERQUANTITY_ASC = "MINORDERQUANTITY_ASC",
  MINORDERQUANTITY_DESC = "MINORDERQUANTITY_DESC",
  SKU_ASC = "SKU_ASC",
  SKU_DESC = "SKU_DESC",
  TITLE_ASC = "TITLE_ASC",
  TITLE_DESC = "TITLE_DESC",
  UPDATED_DESC = "UPDATED_DESC",
}
export const SharedSortEnum : Record<string , any> = {
    [SortEnum.NEWEST] : {_id : -1},
    [SortEnum.OLDEST] : {_id : 1},    
    [SortEnum.UPDATED_DESC] : {updatedAt : -1 , _id : -1}
}
export const BrandSortEnum : Record<string , any> = {
    [SortEnum.NEWEST] : {_id : -1},
    [SortEnum.OLDEST] : {_id : 1},
    [SortEnum.NAME_DESC] : {name : -1 , _id : -1}, // name z-a
    [SortEnum.NAME_ASC] : {name : 1 , _id : 1}, // name a-z
    [SortEnum.UPDATED_DESC] : {updatedAt : -1 , _id : -1} // the lastes updates
}
export const BrandSupplierSortEnum : Record<string , any> = {
    [SortEnum.NEWEST] : {_id : -1},
    [SortEnum.OLDEST] : {_id : 1},
    [SortEnum.NAME_DESC] : {brandSupplierSnapshot : -1 , _id : -1}, // name z-a
    [SortEnum.NAME_ASC] : {brandSupplierSnapshot : 1 , _id : 1}, // name a-z
    [SortEnum.UPDATED_DESC] : {updatedAt : -1 , _id : -1} // the lastes updates
}
export const CategorySortEnum : Record<string , any>  = {
    [SortEnum.NEWEST] : {_id : -1},
    [SortEnum.OLDEST] : {_id : 1},
    [SortEnum.NAME_DESC] : {name : -1 , _id : -1}, // name z-a
    [SortEnum.NAME_ASC] : {name : 1 , _id : 1}, // name a-z
    [SortEnum.UPDATED_DESC] : {updatedAt : -1 , _id : -1}, // the lastes updates
    [SortEnum.PRICE_ASC] : {}
}
export const ProductSortEnum : Record<string , any>= {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.TITLE_ASC]: { title: 1 },
  [SortEnum.TITLE_DESC]: { title: -1 },

  [SortEnum.PRICE_ASC] : {basePrice : 1},
  [SortEnum.PRICE_DESC] : {basePrice : -1},

  [SortEnum.REVIEW_ASC] : {reviewCount : 1},
  [SortEnum.REVIEW_DESC] : {reviewCount : -1},

  [SortEnum.UPDATED_DESC]: { updatedAt: -1, _id: -1 }
};
export const ProductVariantSortEnum : Record<string , any>= {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.SKU_ASC]: { sku: 1 },
  [SortEnum.SKU_DESC]: { sku: -1 },

  [SortEnum.UPDATED_DESC]: { updatedAt: -1, _id: -1 }
};
export const InventorySortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.TITLE_ASC]: { productTitleSnapshot: 1 },
  [SortEnum.TITLE_DESC]: { productTitleSnapshot: -1 },

  [SortEnum.SKU_ASC]: { skuSnapshot: 1 },
  [SortEnum.SKU_DESC]: { skuSnapshot: -1 },

  [SortEnum.UPDATED_DESC]: { updatedAt: -1, _id: -1 }
};
export const SupplierSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.NAME_DESC] : {name : -1 , _id : -1}, 
  [SortEnum.NAME_ASC] : {name : 1 , _id : 1},

  [SortEnum.UPDATED_DESC]: { updatedAt: -1, _id: -1 }
};
export const ProductSupplierSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.PRICE_DESC] : {costPrice : -1 , _id : -1}, 
  [SortEnum.PRICE_ASC] : {costPrice : 1 , _id : 1},

  [SortEnum.MINORDERQUANTITY_DESC] : {minOrderQuantity : -1 , _id : -1}, 
  [SortEnum.MINORDERQUANTITY_ASC] : {minOrderQuantity : 1 , _id : 1},

  [SortEnum.UPDATED_DESC]: { updatedAt: -1, _id: -1 }
};
export const PurchaseProductSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.NAME_DESC] : {supplierNameSnapshot : -1 , _id : -1}, 
  [SortEnum.NAME_ASC] : {supplierNameSnapshot : 1 , _id : 1},

  [SortEnum.UPDATED_DESC]: { updatedAt: -1, _id: -1 }
};
export const WareHouseSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.NAME_DESC] : {name : -1 , _id : -1}, 
  [SortEnum.NAME_ASC] : {name : 1 , _id : 1},

  [SortEnum.UPDATED_DESC]: { updatedAt: -1, _id: -1 }
};
export const WareHouseTransformSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.NAME_DESC] : {productVariantNameSnapshot : -1 , _id : -1}, 
  [SortEnum.NAME_ASC] : {productVariantNameSnapshot : 1 , _id : 1},

  [SortEnum.UPDATED_DESC]: { updatedAt: -1, _id: -1 }
};
export const InventoryMovementSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.NAME_DESC] : {name : -1 , _id : -1}, 
  [SortEnum.NAME_ASC] : {name : 1 , _id : 1},

  [SortEnum.SKU_DESC] : {sku : -1 , _id : -1}, 
  [SortEnum.SKU_ASC] : {sku : 1 , _id : 1},

  [SortEnum.UPDATED_DESC]: { updatedAt: -1, _id: -1 }
};
export const StockAdjustmenSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.NAME_DESC] : {warehouseNameSnapshot : -1 , _id : -1}, 
  [SortEnum.NAME_ASC] : {warehouseNameSnapshot : 1 , _id : 1},

  [SortEnum.SKU_DESC] : {"items.skuSnapShot" : -1 , _id : -1}, 
  [SortEnum.SKU_ASC] : {"items.skuSnapShot" : 1 , _id : 1},

  [SortEnum.UPDATED_DESC]: { updatedAt: -1, _id: -1 }
};
export const CouponSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.CODE_DESC] : {code : -1 , _id : -1}, 
  [SortEnum.CODE_ASC] : {code : 1 , _id : 1},

  [SortEnum.COUPON_VALUE_DESC] : {value : -1 , _id : -1}, 
  [SortEnum.COUPON_VALUE_ASC] : {value : 1 , _id : 1},

  [SortEnum.UPDATED_DESC]: { updatedAt: -1, _id: -1 }
};
export const ShippingZoneSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.PRICE_DESC] : {price : -1 , _id : -1}, 
  [SortEnum.PRICE_ASC] : {price : 1 , _id : 1},
};

export const OrderSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.DISCOUNTAMOUNT_DESC] : {discountAmount : -1 , _id : -1}, 
  [SortEnum.DISCOUNTAMOUNT_ASC] : {discountAmount : 1 , _id : 1},

  [SortEnum.PRICE_DESC] : {totalPrice : -1 , _id : -1}, 
  [SortEnum.PRICE_ASC] : {totalPrice : 1 , _id : 1},
};
export const PaymentSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.REFUND_AMOUNT_DESC] : {refundedAmount : -1 , _id : -1}, 
  [SortEnum.REFUND_AMOUNT_ASC] : {refundedAmount : 1 , _id : 1},

  [SortEnum.PRICE_DESC] : {amount : -1 , _id : -1}, 
  [SortEnum.PRICE_ASC] : {amount : 1 , _id : 1},
};
export const ShipmentSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },

  [SortEnum.PRICE_DESC] : {codAmount : -1 , _id : -1}, 
  [SortEnum.PRICE_ASC] : {codAmount : 1 , _id : 1},
};
export const CurrencyRateSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },
};
export const FinancialSortEnum : Record<string , any> = {
  [SortEnum.NEWEST]: { _id: -1 },
  [SortEnum.OLDEST]: { _id: 1 },
  [SortEnum.PRICE_ASC]: { amount: 1 , _id : 1},
  [SortEnum.PRICE_DESC]: { amount: -1 , _id : -1 },

};