import { filter, find, map } from 'lodash'
import { demoPCCs, demoPCCTestings, demoPCs, demoProductBasics, demoProductSizes } from '../demo/product'
import { demoPCCUsages, demoPCCVendors } from '../demo/sales'

export function getProductBasic(id) {
  return find(demoProductBasics, it => it.id === Number(id))
}

export function getPCC(id) {
  return find(demoPCCs, it => it.id === Number(id))
}

export function getProductSize(id) {
  return find(demoProductSizes, it => it.id === Number(id))
}

export function getPCCDetails(v) {
  const pcc = typeof v === 'object' ? v : getPCC(v)
  if (!pcc) {
    return {}
  }

  const relatedTestings = filter(demoPCCTestings, it => it.pccId === pcc.id)
  const relatedComponents = filter(demoPCs, it => it.pccId === pcc.id)
  const relatedVendors = filter(demoPCCVendors, it => it.pccId === pcc.id)
  const relatedUsages = filter(demoPCCUsages, it => it.pccId === pcc.id)
  return {
    ...pcc, 
    components: relatedComponents, 
    testings: relatedTestings,
    vendors: relatedVendors,
    usages: relatedUsages
  }
}

export function getProductSizeDetails(v) {
  const size = typeof v === 'object' ? v : getProductSize(v)
  if (!size) {
    return {}
  }

  const relatedPCCs = filter(demoPCCs, it => it.productSizeId === size.id)
  return {
    ...size,
    pccs: map(relatedPCCs, it => getPCCDetails(it))
  }
}

export function getProductDetails(v) {
  const basicPart = typeof v === 'object' ? v : getProductBasic(v)
  if (!basicPart) {
    return {}
  }

  const relatedSizes = filter(demoProductSizes, size => size.productBasicId === basicPart.id)
  return {
    ...basicPart, 
    sizes: map(relatedSizes, it => getProductSizeDetails(it))
  }
}