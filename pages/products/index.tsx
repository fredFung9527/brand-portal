import { Button, Grid, Divider } from '@mui/material'
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
import { demoIndustries, demoMaterials, demoStatuses } from '../../demo/product'
import useTranslation from 'next-translate/useTranslation'
import { demoTargets } from '../../demo/brand'
import MarketCodeInput from '../../components/product-input/MarketCodeInput'
import ProductSeasonInput from '../../components/product-input/SeasonInput'
import ExportIcon from '../../components/ExportIcon'
import { useDialog } from '../../components/providers/DialogProvider'
import MyCheckBox from '../../components/MyCheckBox'
import { map } from 'lodash'

const originalFilterSeettings = {
  statuses: [],
  industries: [],
  materials: [],
  sizes: [],
  axCodes: [],
  target: '',
  marketCodes: [],
  devSeasons: [],
  designers: [],
  minPullTest: '',
  maxPullTest: ''
}

function ExportButton() {
  const { t } = useTranslation('products')
  const [openDialog, closeDialog] = useDialog()
  const combinations = ['All', 'Empty', 'Set A', 'Set B']
  const fields = ['name', 'status', 'description', 'remarks', 'target']

  function onClick() {
    openDialog({
      title: t('common:export'),
      content:
        <>
          <Grid container columnSpacing={2}>
            {map(combinations, key =>
              <Grid item key={key} xs={6} sm={4} md={3}>
                <MyCheckBox label={key} hideHelperText/>
              </Grid>
            )}
          </Grid>
          <Divider sx={{my: 1}}/>
          <Grid container columnSpacing={2}>
            {map(fields, key =>
              <Grid item key={key} xs={6} sm={4} md={3}>
                <MyCheckBox label={t(key)} hideHelperText/>
              </Grid>
            )}
          </Grid>
        </>,
      actions:
        <Button color='primary' onClick={() => closeDialog()}>{t('common:confirm')}</Button>
    })
  }

  return (
    <ExportIcon onClick={onClick}/>
  )
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
          key: 'industries',
          label: t('industries'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete multiple items={demoIndustries}/>
        },
        {
          key: 'sizes',
          label: t('sizes'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete multiple freeSolo items={[]}/>
        },
        {
          key: 'materials',
          label: t('materials'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete multiple items={demoMaterials}/>
        },
        {
          key: 'axCodes',
          label: t('axCodes'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete freeSolo multiple items={[]}/>
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
          component: <MarketCodeInput/>
        },
        {
          key: 'devSeasons',
          label: t('devSeasons'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <ProductSeasonInput/>,
          otherProps: {
            multiple: true
          }
        },
        {
          key: 'designers',
          label: t('designers'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete freeSolo multiple items={[]}/>
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
      query: v === 'grid' ? null : { mode: v }
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
        <Grid item>
          <ExportButton/>
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