import { useState } from 'react'
import ProductCard from './ProductCard'
import { demoProductBasics } from '../../demo/product'
import GridViewItems from '../GridViewItems'

export default function GridViewProducts() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(10)

  return (
    <GridViewItems
      items={products}
      keyKey='id'
      renderItem={(it) => <ProductCard product={it}/>}
      xs={6}
      sm={4}
      md={3}
      init={() => setProducts(demoProductBasics)}
    />
  )
}