import { TableRow } from '@mui/material'
import { filter, find, includes, join, last, map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import TableViewItems, { MyTableCell, TableActions } from '../TableViewItems'
import ProductStatus from '../products/ProductStatus'
import ProductTargetChip from '../products/ProductTargetChip'
import MarketCodeChip from '../products/MarketCodeChip'
import LastUpdate from '../products/LastUpdate'
import { demoPCCForSales } from '../../demo/sales'
import { getPCCForSalesDetails } from '../../utils/sales'
import PriceDisplay from './PriceDisplay'

function SalesTableRow({item}) {
  const productBasic = item?.productBasic || {}
  const productSize = item?.productSize || {}
  const pcc = item?.pcc || {}

  function getFromExtraInfomations(type) {
    return find(pcc?.extraInfomations, it => it.type === type)
  }
  function getFromTestings(type) {
    return find(pcc?.testings, it => it.type === type)
  }

  if (!item) {
    return null
  }
  return (
    <TableRow>
      <MyTableCell width={192}>
        <TableActions
          detailPath={`/sales/${item.id}`}
          editPath={'/sales/new'}
          clonePath={'/sales/new'}
          onRemove={null}
        />
      </MyTableCell>
      <MyTableCell width={220}>
        { item.newProductName || productBasic.name }
      </MyTableCell>
      <MyTableCell>
        <ProductStatus status={productBasic.status}/>
      </MyTableCell>
      <MyTableCell width={114}>
        <ProductTargetChip target={productBasic.target}/>
      </MyTableCell>
      <MyTableCell>
        {item.brandRefCode}
      </MyTableCell>
      <MyTableCell>
        <MarketCodeChip label={item.marketCode}/>
      </MyTableCell>
      <MyTableCell>
        {item.newSizeName || productSize.sizeName}
      </MyTableCell>
      <MyTableCell width={160}>
        {pcc.name}
      </MyTableCell>
      <MyTableCell>
        <PriceDisplay item={last(pcc.prices)}/>
      </MyTableCell>
      <MyTableCell width={200}>
        { join(map(pcc.components, it => it.axCode), ', ') }
      </MyTableCell>
      <MyTableCell>
        {getFromExtraInfomations('Bulk Leadtime')?.detail}
      </MyTableCell>
      <MyTableCell>
        {getFromExtraInfomations('Mold Charge')?.detail}
      </MyTableCell>
      <MyTableCell>
        {getFromExtraInfomations('Bulk Order MOQ')?.detail}
      </MyTableCell>
      <MyTableCell>
        {getFromExtraInfomations('Bulk Color MOQ')?.detail}
      </MyTableCell>
      <MyTableCell>
        {getFromTestings('Pull Test')?.result}
      </MyTableCell>
      <MyTableCell>
        {getFromTestings('Needle Detection')?.result}
      </MyTableCell>
      <MyTableCell>
        <LastUpdate item={item} mode='simple'/>
      </MyTableCell>
    </TableRow>
  )
}

export default function TableViewSales({keyword, filterSettings}) {
  const { t } = useTranslation('products')

  const [sales, setSales] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState(10)

  useEffect(() => {
    const relatedPPCForSales = filterSettings?.marketCodes ? 
      filter(demoPCCForSales, it => includes(filterSettings.marketCodes, it.marketCode)):
      demoPCCForSales
    setSales(map(relatedPPCForSales, it => getPCCForSalesDetails(it)))
  }, [keyword, filterSettings])

  return (
    <TableViewItems
      headers={[
        '', t('name'), t('status'), t('target'),
        t('brandRefCode'), t('marketCode'), t('size'), t('pccName'),
        t('price'), t('axCodes'), t('bulkLeadtime'), t('moldCharge'), t('bulkOrderMoq'), t('bulkColorMoq'),
        t('pullTest'), t('needleDetection'), t('common:lastUpdate')
      ]}
      items={sales}
      keyKey='id'
      renderItem={(it) => <SalesTableRow item={it}/>}
      page={page}
      pageSize={pageSize}
      total={total}
      onPage={setPage}
      onPageSize={setPageSize}
    />
  )
}