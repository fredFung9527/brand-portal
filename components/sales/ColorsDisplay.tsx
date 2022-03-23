import { Divider, Grid } from '@mui/material'
import { filter, includes, map, reduce, uniq } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { demoColors } from '../../demo/colors'
import { demoMaterials } from '../../demo/product'
import { hasKeyword } from '../../utils/common'
import MyTextField from '../form/MyTextField'
import MyAutocomplete from '../select/MyAutocomplete'
import MySelect from '../select/MySelect'
import SimpleTable from '../SimpleTable'

export default function ColorsDisplay({marketCode, components}) {
  const { t } = useTranslation('products')

  const [materials, setMaterials] = useState(
    uniq(reduce(components, (result, v) => {
      if (v.materials?.length) {
        result = [...result, ...v.materials]
      }
      return result
    }, []))
  )
  const [axCode, setAxCode] = useState('')
  const [status, setStatus] = useState('')
  const [keyword, setKeyword] = useState('')
  const [tableData, setTableData] = useState([])


  useEffect(() => {
    const colors = filter(demoColors, it => {
      if (it.marketCode !== marketCode) {
        return false
      }
      if (materials.length && !includes(materials, it.material)) {
        return false
      }
      if (axCode && !hasKeyword(it.axCode, axCode)) {
        return false
      }
      if (status && it.status !== status) {
        return false
      }
      if (
        keyword && !hasKeyword(it.colorCode, keyword) && !hasKeyword(it.extColorCode, keyword) && 
        !hasKeyword(it.name, keyword) && !hasKeyword(it.supplier, keyword) && !hasKeyword(it.season, keyword)
      ) {
        return false
      }
      return true
    })
    setTableData(map(colors, it => [
      it.material, it.axCode, it.colorCode, it.status, it.name, it.supplier, it.extColorCode,
      it.season, 'Fred Fung 01/03/2022'
    ]))
  }, [materials, axCode, status, keyword])

  return (
    <>
      <Divider sx={{mb: 2}}/>
      <Grid container columnSpacing={2} alignItems='flex-end'>
        <Grid item xs={6} sm={4} md={3}>
          <MyAutocomplete
            label={t('materials')}
            value={materials}
            onChange={setMaterials}
            multiple
            items={demoMaterials}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <MyTextField
            label={t('axCode')}
            value={axCode}
            onChange={setAxCode}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <MySelect
            label={t('status')}
            value={status}
            onChange={setStatus}
            items={['Approved', 'Dipping']}
            notMust
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <MyTextField
            label={t('common:keyword')}
            value={keyword}
            onChange={setKeyword}
          />
        </Grid>
      </Grid>

      <SimpleTable
        headerColor='success'
        headers={[
          { text: t('material') },
          { text: t('axCode') },
          { text: t('colorCode') },
          { text: t('status') },
          { text: t('name') },
          { text: t('supplier') },
          { text: t('extColorCode') },
          { text: t('season') },
          { text: t('common:lastUpdate') },
        ]}
        data={tableData}
      />
    </>
  )
}