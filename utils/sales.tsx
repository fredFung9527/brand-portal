import { filter, find, map, sortBy } from 'lodash'
import { demoPCs, demoTestings } from '../demo/product'
import { demoOnSales, demoPrices, demoSizeInfomations } from '../demo/sales'
import { getProduct, getProductSize } from './products'

export function getOnSale(id) {
  return find(demoOnSales, it => it.id === Number(id))
}

export function getOnSalesDetails(v) {
  const theItem = typeof v === 'string' ? getOnSale(v) : v
  if (!theItem) {
    return {}
  }

  const testings = filter(demoTestings, it => it.productSizeId === theItem.productSizeId)
  const prices = sortBy(filter(demoPrices, it => it.productSizeId === theItem.productSizeId && it.marketCode === theItem.marketCode && it.brandRefCode === theItem.brandRefCode), it => it.updated)
  const components = map(filter(demoPCs, it => it.productSizeId === theItem.productSizeId), it => ({...it, prices}))
  const sizeInfomations = filter(demoSizeInfomations, it => it.productSizeId === theItem.productSizeId && it.marketCode === theItem.marketCode && it.brandRefCode === theItem.brandRefCode)
  const size = getProductSize(theItem.productSizeId)
  const product = getProduct(size?.productBasicId)
  return {...theItem, testings, components, prices, sizeInfomations, size, product }
}