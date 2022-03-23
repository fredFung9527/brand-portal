import { forEachRight } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import PriceDisplay from '../sales/PriceDisplay'
import SimpleTable from '../SimpleTable'
import LastUpdate from './LastUpdate'

export default function SuggestPricesDisplay({component=null}) {
  const { t } = useTranslation('products')

  const demoSuggestPrices = [
    {
      'season': 'W22',
      'color': null,
      'currency': 'USD',
      'value': 0.05,
      'unit': 'PCS',
      'updated': '01/07/2021',
      'updatedBy': 'Fred Fung',
    },
    {
      'season': 'W22',
      'color': null,
      'currency': 'HKD',
      'value': 0.55,
      'unit': 'PCS',
      'updated': '01/07/2021',
      'updatedBy': 'Fred Fung',
    },
  ]
  let tableData = []
  forEachRight(demoSuggestPrices, it => {
    const lastUpdate = <LastUpdate item={it} mode='simple'/>
    const price = <PriceDisplay item={it} isSuggestPrice/>
    tableData.push([it.season, it.color, price, lastUpdate])
  })

  return (
    <SimpleTable
      headerColor='warning'
      headers={[
        { text: t('seasonOrYear') },
        { text: t('color') },
        { text: t('price') },
        { text: t('common:lastUpdate') },
      ]}
      data={tableData}
      component={component}
    />
  )
}