import { Types } from "mongoose"

export interface IGetProductsBySales {
  _id : Types.ObjectId
  variantId: Types.ObjectId
  totalQuantitySold: number
  totalRevenue: number
  skuSnapshot: string
  imageSnapshot: string
  currentPrice: number
}
export interface IGetZeroSalesProducts {
  _id : Types.ObjectId
  sku: string,
  price: number,
  totalQuantitySold: number
}
export interface IGetCustomersByActivity {
  userId: Types.ObjectId,
  totalOrdersCount: number
  totalSpent: number
  lastOrderDate: Date,
  firstName: string,
  lastName: string
  email: string
  phone: string
}
export interface IGetUsersWithZeroOrders {
  _id: Types.ObjectId,
  createdAt: Date,
  firstName: string,
  lastName: string
  email: string
  phone: string
}
export interface IGetSalesOverviewMetrics {
  todayRevenue : number
  todayOrdersCount : number
  monthlyRevenue : number
  monthlyOrdersCount : number
  monthlyAOV : number
}
export interface IGetDailySalesChartData {
  date: string
  sales: number
  orders: number
}
export interface IGetCategoriesDemandMetrics {
  categoryId: Types.ObjectId
  name: string
  image : string
  quantitySold: number
  revenue: number
}
export interface IGetbrandsDemandMetrics {
  brandId: Types.ObjectId
  name: string
  image : string
  quantitySold: number
  revenue: number
}