import { filter, find, sortBy } from 'lodash'
import { demoPCCTestings, demoPCs } from '../demo/product'
import { demoPCCExtraInfomations, demoPCCForSales, demoPCCPrices } from '../demo/sales'
import { getPCC, getProductBasic, getProductSize } from './products'

export function getPCCForeSales(id) {
  return find(demoPCCForSales, it => it.id === Number(id))
}

export function getPCCBySaleItem(item) {
  const thePCC = getPCC(item?.pccId)
  const testings = filter(demoPCCTestings, it => it.pccId === item?.pccId)
  const components = filter(demoPCs, it => it.pccId === item?.pccId)
  const prices = sortBy(filter(demoPCCPrices, it => it.pccId === item?.pccId && it.marketCode === item?.marketCode && it.brandRefCode === item?.brandRefCode), it => it.lastUpdated)
  const extraInfomations = filter(demoPCCExtraInfomations, it => it.pccId === item?.pccId && it.marketCode === item?.marketCode && it.brandRefCode === item?.brandRefCode)
  return {...thePCC, extraInfomations, components, testings, prices}
}

export function getPCCForSalesDetails(v) {
  const theItem = typeof v === 'string' ? getPCCForeSales(v) : v
  if (!theItem) {
    return {}
  }

  const pcc = getPCCBySaleItem(theItem)
  const productSize = getProductSize(pcc?.productSizeId)
  const productBasic = getProductBasic(productSize?.productBasicId)
  return {...theItem, pcc, productSize, productBasic }
}