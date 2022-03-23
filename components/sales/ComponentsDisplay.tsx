import { Divider } from '@mui/material'
import { find, join, map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import InformationTable from '../InformationTable'
import MyTabs from '../MyTabs'
import EditSalesButton from '../products/EditSalesButton'
import LastUpdate from '../products/LastUpdate'
import { ProductDisplayImage } from '../products/ProductDisplay'
import PriceHistory from './PriceHistory'
import SubTitle from '../SubTitle'
import SuggestPricesDisplay from '../products/SuggestPricesDisplay'

function OneComponent({item, isGeneral=false}) {
  const { t } = useTranslation('products')

  return (
    <>
      <ProductDisplayImage product={item}/>

      <InformationTable
        sx={{mt: 2}}
        data={[
          { key: t('axCode'), text: item?.axCode },
          { key: t('factories'), text: join(item?.factories, ', ') },
          { key: t('componentType'), text: item?.type },
          { key: t('materials'), text: join(item?.materials, ', ') },
          { key: t('remarks'), text: item?.remarks },
          { key: t('common:lastUpdate'), text: <LastUpdate item={item}/> }
        ]}
      />

      {Boolean(item?.prices?.length) && <PriceHistory prices={item.prices}/>}

      {isGeneral && 
        <>
          <SubTitle>{t('suggestPrices')}</SubTitle>
          <SuggestPricesDisplay/>

          <EditSalesButton to='/sales/new'/>
        </>
      }
    </>
  )
}

export default function ComponentsDisplay({components, hideDivider=false, isGeneral=false}) {
  const [axCodes, setAxCodes] = useState([])
  const [tab, setTab] = useState(components[0]?.axCode || '')
  const [selectedComponent, setSelectedComponent] = useState(components[0] || null)

  useEffect(() => {
    const list = map(components, it => ({ text: `${it.type} / ${it.axCode}`, value: it.axCode}))
    setAxCodes(list)
    setTab(list[0]?.value)
  }, [components])
  useEffect(() => {
    setSelectedComponent(find(components, it => it.axCode === tab))
  }, [tab])

  return (
    <>
      {!hideDivider && <Divider sx={{mb: 2}}/>}
      <MyTabs value={tab} onChange={setTab} items={axCodes} sx={{mb: 2}}/>
      {Boolean(selectedComponent) && <OneComponent item={selectedComponent} isGeneral={isGeneral}/>}
    </>
  )
}