import { Grid } from '@mui/material'
import { useCallback, useState } from 'react'
import MyToggle from '../../components/MyToggle'
import GridViewIcon from '@mui/icons-material/GridView'
import ListAltIcon from '@mui/icons-material/ListAlt'
import MySearchField from '../../components/form/MySearchField'
import FilterButton from '../../components/FilterButton'
import GridViewProducts from '../../components/products/GridViewProducts'
import TableViewProducts from '../../components/products/TableViewProducts'
import Router from 'next/router'
import MyAutocomplete from '../../components/select/MyAutocomplete'
import { demoCurrencies, demoIncoTerms, demoProductTypes, demoProdutcUnits, demoStatuses } from '../../demo/product'
import useTranslation from 'next-translate/useTranslation'
import ProductMaterialInput from '../../components/products/ProductMaterialInput'
import ProductColorInput from '../../components/products/ProductColorInput'
import ProductSizeInput from '../../components/products/ProductSizeInput'
import { demoTargets } from '../../demo/brand'
import ProductMarketCodeInput from '../../components/products/ProductMarketCodeInput'
import ProductSeasonInput from '../../components/products/ProductSeasonInput'
import { demoDesigners } from '../../demo/user'
import { demoSuppliers } from '../../demo/production'

const originalFilterSeettings = {
  statuses: [],
  productTypes: [],
  materials: [],
  colors: [],
  sizes: [],
  itemCodes: [],
  currency: '',
  minPrice: '',
  maxPrice: '',
  unit: '',
  target: '',
  marketCodes: [],
  seasons: [],
  devSeasons: [],
  effectiveSeasons: [],
  designers: [],
  suppliers: [],
  incoTerms: [],
  minPullTest: '',
  maxPullTest: ''
}

function ProductFilterButton() {
  const { t } = useTranslation('products')
  const [filterSettings, setFilterSettings] = useState<any>(originalFilterSeettings)

  return (
    <FilterButton
      value={filterSettings}
      onChange={setFilterSettings}
      initValue={originalFilterSeettings}
      items={[
        {
          key: 'statuses',
          label: t('statuses'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete multiple items={demoStatuses}/>
        },
        {
          key: 'productTypes',
          label: t('productTypes'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete freeSolo multiple items={demoProductTypes}/>
        },
        {
          key: 'materials',
          label: t('materials'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <ProductMaterialInput/>
        },
        {
          key: 'colors',
          label: t('colors'),
          rules: null,
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <ProductColorInput/>
        },
        {
          key: 'sizes',
          label: t('sizes'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <ProductSizeInput noLimit/>
        },
        {
          key: 'itemCodes',
          label: t('itemCodes'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete freeSolo multiple items={[]}/>
        },
        {
          key: 'currency',
          label: t('currency'),
          type: 'select',
          items: demoCurrencies,
          grid: { xs: 12, sm: 6 },
          otherProps: {
            notMust: true
          }
        },
        {
          key: 'minPrice',
          label: t('minPrice'),
          type: 'number',
          grid: { xs: 12, sm: 6 },
        },
        {
          key: 'maxPrice',
          label: t('maxPrice'),
          type: 'number',
          grid: { xs: 12, sm: 6 },
        },
        {
          key: 'unit',
          label: t('unit'),
          type: 'select',
          items: demoProdutcUnits,
          grid: { xs: 12, sm: 6 },
          otherProps: {
            notMust: true
          }
        },
        {
          key: 'target',
          label: t('target'),
          type: 'select',
          items: demoTargets,
          grid: { xs: 12, sm: 6 },
          otherProps: {
            notMust: true
          }
        },
        {
          key: 'marketCodes',
          label: t('marketCodes'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <ProductMarketCodeInput/>
        },
        {
          key: 'seasons',
          label: t('seasons'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <ProductSeasonInput/>
        },
        {
          key: 'devSeasons',
          label: t('devSeasons'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <ProductSeasonInput/>
        },
        {
          key: 'effectiveSeasons',
          label: t('effectiveSeasons'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <ProductSeasonInput/>
        },
        {
          key: 'designers',
          label: t('designers'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete freeSolo multiple items={demoDesigners}/>
        },
        {
          key: 'suppliers',
          label: t('suppliers'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete freeSolo multiple items={demoSuppliers}/>
        },
        {
          key: 'incoTerms',
          label: t('incoTerms'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete multiple items={demoIncoTerms}/>
        },
        {
          key: 'minPullTest',
          label: t('minPullTest'),
          type: 'number',
          grid: { xs: 12, sm: 6 },
        },
        {
          key: 'maxPullTest',
          label: t('maxPullTest'),
          type: 'number',
          grid: { xs: 12, sm: 6 },
        },
      ]}
    />
  )
}

export default function Products({oldMode, oldKeyword}) {
  const [mode, setMode] = useState(oldMode || 'grid')
  const [keyword, setKeyword] = useState(oldKeyword)

  const onUpdateMode = useCallback((v) => {
    setMode(v)
    Router.push({
      pathname: Router.pathname,
      query: v === 'grid' ? null : { mode: v}
    })
  }, [])

  return (
    <>
      <Grid container alignItems='center' spacing={1}>
        <Grid item>
          <MyToggle
            value={mode}
            onChange={onUpdateMode}
            items={[
              { value: 'grid', text: <GridViewIcon/> },
              { value: 'table', text: <ListAltIcon/> }
            ]}
          />
        </Grid>
        <Grid item xs/>
        <Grid item>
          <MySearchField value={keyword} onChange={setKeyword}/>
        </Grid>
        <Grid item>
          <ProductFilterButton/>
        </Grid>
      </Grid>

      {mode === 'grid' ? 
        <GridViewProducts/> : 
        <TableViewProducts/>
      }
    </>
  )
}

Products.needLogin = true

export async function getServerSideProps({query}) {
  const { mode, keyword } = query
  return {
    props: {
      oldMode: mode || '',
      oldKeyword: keyword || ''
    }
  }
}