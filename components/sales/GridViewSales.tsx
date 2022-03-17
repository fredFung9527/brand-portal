import { useEffect, useState } from 'react'
import GridViewItems from '../GridViewItems'
import { filter, includes, map } from 'lodash'
import { demoOnSales } from '../../demo/sales'
import { getOnSalesDetails } from '../../utils/sales'
import SalesCard from './SalesCard'

export default function GridViewSales({keyword, filterSettings}) {
  const [sales, setSales] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(10)

  useEffect(() => {
    const relatedOnSales = filterSettings?.marketCodes ? 
      filter(demoOnSales, it => includes(filterSettings.marketCodes, it.marketCode)):
      demoOnSales
    setSales(map(relatedOnSales, it => getOnSalesDetails(it)))
  }, [keyword, filterSettings])

  return (
    <GridViewItems
      items={sales}
      keyKey='id'
      renderItem={(it) => <SalesCard item={it}/>}
      xs={6}
      sm={4}
      md={3}
    />
  )
}