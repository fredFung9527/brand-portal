import { filter, find, map } from 'lodash'
import { demoPCs, demoProductBasics, demoProductSizes, demoTestings } from '../demo/product'
import { demoUsages, demoVendors } from '../demo/sales'

export function getProduct(id) {
  return find(demoProductBasics, it => it.id === Number(id))
}

export function getProductSize(id) {
  return find(demoProductSizes, it => it.id === Number(id))
}

export function getProductSizeDetails(v) {
  const size = typeof v === 'object' ? v : getProductSize(v)
  if (!size) {
    return {}
  }

  const relatedTestings = filter(demoTestings, it => it.productSizeId === size.id)
  const relatedComponents = filter(demoPCs, it => it.productSizeId === size.id)
  const relatedVendors = filter(demoVendors, it => it.productSizeId === size.id)
  const relatedUsages = filter(demoUsages, it => it.productSizeId === size.id)
  return {
    ...size,
    components: relatedComponents, 
    testings: relatedTestings,
    vendors: relatedVendors,
    usages: relatedUsages
  }
}

export function getProductDetails(v) {
  const basicPart = typeof v === 'object' ? v : getProduct(v)
  if (!basicPart) {
    return {}
  }

  const relatedSizes = filter(demoProductSizes, size => size.productBasicId === basicPart.id)
  return {
    ...basicPart, 
    sizes: map(relatedSizes, it => getProductSizeDetails(it))
  }
}