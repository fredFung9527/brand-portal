import { Grid, TableRow } from '@mui/material'
import { filter, join, map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useState } from 'react'
import { demoProductBasics, demoProductSizes } from '../../demo/product'
import TableViewItems, { MyTableCell, TableActions } from '../TableViewItems'
import ProductStatus from './ProductStatus'
import ProductTargetChip from './ProductTargetChip'
import MarketCodeChip from './MarketCodeChip'
import LastUpdate from './LastUpdate'

function ProductTableRow({product}) {
  if (!product) {
    return null
  }

  return (
    <TableRow>
      <MyTableCell width={192}>
        <TableActions
          detailPath={`/products/${product.id}`}
          editPath={`/products/new/${product.target === 'Custom' ? 'custom' : 'general'}`}
          clonePath={`/products/new/${product.target === 'Custom' ? 'custom' : 'general'}`}
          onRemove={null}
        />
      </MyTableCell>
      <MyTableCell width={220}>
        {product.name}
      </MyTableCell>
      <MyTableCell>
        <ProductStatus status={product.status}/>
      </MyTableCell>
      <MyTableCell width={150}>
        { join(product.industries, ', ') }
      </MyTableCell>
      <MyTableCell width={200}>
        { join(product.sizes, ', ') }
      </MyTableCell>
      <MyTableCell width={114}>
        <ProductTargetChip target={product.target}/>
      </MyTableCell>
      <MyTableCell width={300}>
        <Grid container spacing={1}>
          {map(product.limitedMarketCodes, v => 
            <Grid item key={v}>
              <MarketCodeChip label={v}/>
            </Grid>
          )}
        </Grid>
      </MyTableCell>
      <MyTableCell>
        <LastUpdate item={product} mode='simple'/>
      </MyTableCell>
    </TableRow>
  )
}

export default function TableViewProducts() {
  const { t } = useTranslation('products')

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState(10)

  const initProducts = useCallback(() => {
    const allSizes = demoProductSizes
    setProducts(map(demoProductBasics, it => {
      const relatedSizes = filter(allSizes, size => size.productBasicId === it.id)
      return {...it, sizes: map(relatedSizes, size => size.sizeName)}
    }))
  }, [])

  return (
    <TableViewItems
      headers={[
        '', t('name'), t('status'), t('industries'),
        t('sizes'), t('target'), t('marketCodes'), t('common:lastUpdate')
      ]}
      items={products}
      keyKey='id'
      renderItem={(it) => <ProductTableRow product={it}/>}
      page={page}
      pageSize={pageSize}
      total={total}
      init={initProducts}
      onPage={setPage}
      onPageSize={setPageSize}
    />
  )
}