import { useEffect, useState } from 'react'
import GridViewItems from '../GridViewItems'
import { filter, includes, map } from 'lodash'
import { demoPCCForSales } from '../../demo/sales'
import { getPCCForSalesDetails } from '../../utils/sales'
import SalesCard from './SalesCard'

export default function GridViewSales({keyword, filterSettings}) {
  const [sales, setSales] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(10)

  useEffect(() => {
    const relatedPPCForSales = filterSettings?.marketCodes ? 
      filter(demoPCCForSales, it => includes(filterSettings.marketCodes, it.marketCode)):
      demoPCCForSales
    setSales(map(relatedPPCForSales, it => getPCCForSalesDetails(it)))
  }, [keyword, filterSettings])
  
  return (
    <GridViewItems
      items={sales}
      keyKey='id'
      renderItem={(it) => <SalesCard item={it}/>}
      xs={6}
      sm={4}
      md={3}
      page={page}
      totalPage={totalPage}
      onPage={setPage}
    />
  )
}