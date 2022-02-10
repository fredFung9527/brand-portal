import { Grid, IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import { join, map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { demoProducts } from '../../demo/product'
import MyLink from '../MyLink'
import TableViewItems from '../TableViewItems'
import ColorChip from './ColorChip'
import MaterialChip from './MaterialChip'
import ProductPrice from './ProductPrice'
import ProductStatus from './ProductStatus'
import EditIcon from '@mui/icons-material/Edit'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import DeleteButton from '../DeleteButton'
import ProductTargetChip from './ProductTargetChip'
import MarketCodeChip from './MarketCodeChip'
import PullTestDisplay from './PullTestDisplay'
import { getCurrencySymbol, numberWithCommas } from '../../utils/common'

function Actions({product}) {
  const { t } = useTranslation('common')
  return (
    <>
      <MyLink to={`/products/${product.id}`}>
        <Tooltip title={t('open')}>
          <IconButton color='success'>
            <FileOpenIcon/>
          </IconButton>
        </Tooltip>
      </MyLink>
      <MyLink to={'/products/new'}>
        <Tooltip title={t('edit')}>
          <IconButton color='primary'>
            <EditIcon/>
          </IconButton>
        </Tooltip>
      </MyLink>
      <DeleteButton onRemove={() => null}/>
    </>
  )
}

function MyTableCell({width=150, children}) {
  return (
    <TableCell style={{ minWidth: width }}>
      { children }
    </TableCell>
  )
}

function ProductTableRow({product}) {
  const { t } = useTranslation('products')

  return (
    <TableRow>
      <MyTableCell width={158}>
        <Actions product={product}/>
      </MyTableCell>
      <MyTableCell width={280}>
        {product.name}
      </MyTableCell>
      <MyTableCell>
        <ProductStatus status={product.status}/>
      </MyTableCell>
      <MyTableCell width={100}>
        { join(product.seasons, ', ') }
      </MyTableCell>
      <MyTableCell>
        <ProductPrice product={product} mode='table'/>
      </MyTableCell>
      <MyTableCell width={200}>
        <Grid container spacing={1}>
          {map(product.materials, v => 
            <Grid item key={v}>
              <MaterialChip label={v}/>
            </Grid>
          )}
        </Grid>
      </MyTableCell>
      <MyTableCell width={200}>
        <Grid container spacing={1}>
          {map(product.colors, v => 
            <Grid item key={v}>
              <ColorChip label={v}/>
            </Grid>
          )}
        </Grid>
      </MyTableCell>
      <MyTableCell>
        { product.productType }
      </MyTableCell>
      <MyTableCell width={200}>
        { join(product.itemCodes, ', ') }
      </MyTableCell>
      <MyTableCell width={200}>
        { join(product.sizes, ', ') }
      </MyTableCell>
      <MyTableCell width={114}>
        <ProductTargetChip target={product.target}/>
      </MyTableCell>
      <MyTableCell width={200}>
        <Grid container spacing={1}>
          {map(product.marketCodes, v => 
            <Grid item key={v}>
              <MarketCodeChip label={v}/>
            </Grid>
          )}
        </Grid>
      </MyTableCell>
      <MyTableCell width={180}>
        { product.devSeason }
      </MyTableCell>
      <MyTableCell>
        { product.designer }
      </MyTableCell>
      <MyTableCell>
        {getCurrencySymbol(product.currency)} { numberWithCommas(product.moldCharge) }
      </MyTableCell>
      <MyTableCell width={180}>
        { numberWithCommas(product.bulkLeadtime) }
      </MyTableCell>
      <MyTableCell>
        { numberWithCommas(product.bulkOrderMoq) }
      </MyTableCell>
      <MyTableCell>
        { product.supplier }
      </MyTableCell>
      <MyTableCell>
        { product.incoTerm }
      </MyTableCell>
      <MyTableCell>
        <PullTestDisplay value={product.pullTest}/>
      </MyTableCell>
      <MyTableCell>
        { product.lastUpdateBy } { product.lastUpdate }
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

  return (
    <TableViewItems
      headers={[
        '', t('name'), t('status'), t('seasons'), t('price'), t('materials'), t('colors'), t('productType'), 
        t('itemCodes'), t('sizes'), t('target'), t('marketCodes'), t('devSeason'), t('designer'),
        t('moldCharge'), t('bulkLeadtime'), t('bulkOrderMoq'),
        t('supplier'), t('incoTerm'), t('pullTest'), t('lastUpdate')
      ]}
      items={products}
      keyKey='id'
      renderItem={(it) => <ProductTableRow product={it}/>}
      page={page}
      pageSize={pageSize}
      total={total}
      init={() => setProducts(demoProducts)}
      onPage={setPage}
      onPageSize={setPageSize}
    />
  )
}