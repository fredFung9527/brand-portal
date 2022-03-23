import { Button, Divider, Grid } from '@mui/material'
import { useCallback, useEffect } from 'react'
import MyToggle from '../MyToggle'
import GridViewIcon from '@mui/icons-material/GridView'
import ListAltIcon from '@mui/icons-material/ListAlt'
import MySearchField from '../form/MySearchField'
import FilterButton from '../FilterButton'
import Router, { useRouter } from 'next/router'
import MyAutocomplete from '../select/MyAutocomplete'
import useTranslation from 'next-translate/useTranslation'
import MarketCodeInput from '../product-input/MarketCodeInput'
import { useRecoilState } from 'recoil'
import { recoilSalesFilterSettings, recoilSalesKeyword } from '../../recoil/sales'
import { find, map, omit } from 'lodash'
import { demoMyBrands } from '../../demo/user'
import MyCheckBox from '../MyCheckBox'
import { useDialog } from '../providers/DialogProvider'
import ExportIcon from '../ExportIcon'

const originalFilterSeettings = {
  marketCodes: [],
  brandRefCodes: [],
  axCodes: []
}

function ExportButton() {
  const { t } = useTranslation('products')
  const [openDialog, closeDialog] = useDialog()
  const combinations = ['All', 'Empty', 'Set A', 'Set B']
  const fields = ['name', 'status', 'description', 'remarks', 'target', 'prices']

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

function SalesFilterButton({summaryMode}) {
  const { t } = useTranslation('products')
  const router = useRouter()
  const [filterSettings, setFilterSettings] = useRecoilState(recoilSalesFilterSettings)

  useEffect(() => {
    if (!filterSettings) {
      setFilterSettings(originalFilterSeettings)
    }
  }, [filterSettings])
  useEffect(() => {
    if (summaryMode) {
      return
    }
    const brandName = router.query.name
    if (brandName && !filterSettings?.marketCodes?.length) {
      const relatedMarkets = find(demoMyBrands, it => it.name === brandName)?.marketCodes || []
      setFilterSettings({
        ...(filterSettings || originalFilterSeettings),
        marketCodes: relatedMarkets
      })
    }
  }, [summaryMode, router.query])

  return (
    <FilterButton
      value={filterSettings}
      onChange={setFilterSettings}
      initValue={originalFilterSeettings}
      items={[
        ...summaryMode ? 
          [] :
          [{
            key: 'marketCodes',
            label: t('marketCodes'),
            type: 'custom',
            grid: { xs: 12, sm: 6 },
            component: <MarketCodeInput/>
          }] as any,
        {
          key: 'brandRefCodes',
          label: t('brandRefCodes'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete freeSolo multiple items={[]}/>
        },
        {
          key: 'axCodes',
          label: t('axCodes'),
          type: 'custom',
          grid: { xs: 12, sm: 6 },
          component: <MyAutocomplete freeSolo multiple items={[]}/>
        }
      ]}
    />
  )
}

export default function SalesToolBar({mode=null, setMode=null, summaryMode=false}){
  const [keyword, setKeyword] = useRecoilState(recoilSalesKeyword)

  const onUpdateMode = useCallback((v) => {
    setMode(v)
    const newQuery = v === 'grid' ? omit(Router.query, 'mode') : {...Router.query, mode: v }
    Router.push({
      pathname: Router.pathname,
      query: newQuery
    })
  }, [])
  
  return (
    <Grid container alignItems='center' spacing={1}>
      {Boolean(mode && setMode) && <Grid item>
        <MyToggle
          value={mode}
          onChange={onUpdateMode}
          items={[
            { value: 'grid', text: <GridViewIcon/> },
            { value: 'table', text: <ListAltIcon/> }
          ]}
        />
      </Grid>}
      <Grid item xs/>
      <Grid item>
        <MySearchField value={keyword} onChange={setKeyword}/>
      </Grid>
      <Grid item>
        <SalesFilterButton summaryMode={summaryMode}/>
      </Grid>
      {!summaryMode &&
        <Grid item>
          <ExportButton/>
        </Grid>
      }
    </Grid>
  )
}