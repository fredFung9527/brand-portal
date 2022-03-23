import { forEach } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import InformationTable from '../InformationTable'
import SimpleTable from '../SimpleTable'
import SubTitle from '../SubTitle'
import EditSalesButton from './EditSalesButton'
import LastUpdate from './LastUpdate'
import SuggestPricesDisplay from './SuggestPricesDisplay'

export default function SizeCard({size, newSizeName=''}) {
  const { t } = useTranslation('products')

  const [testingDatas, setTestingData] = useState([])
  const [vendorDatas, setVendorData] = useState([])
  const [usageDatas, setUsageData] = useState([])


  useEffect(() => {
    let list = []
    forEach(size?.testings, it => {
      const lastUpdate = <LastUpdate item={it} mode='simple'/>
      list.push([it.type, it.result, lastUpdate])
      if (it.remarks) {
        list.push([it.remarks])
      }
    })
    setTestingData(list)

    list = []
    forEach(size?.vendors, it => {
      const lastUpdate = <LastUpdate item={it} mode='simple'/>
      list.push([it.marketCode, it.brandRefCode, it.value, lastUpdate])
    })
    setVendorData(list)

    list = []
    forEach(size?.usages, it => {
      const lastUpdate = <LastUpdate item={it} mode='simple'/>
      list.push([it.marketCode, it.brandRefCode, it.value, lastUpdate])
    })
    setUsageData(list)
  }, [size])

  return (
    <>
      <SubTitle>{t('sizeDetails')}</SubTitle>
      <InformationTable
        data={[
          { key: t('sizeName'), text: newSizeName || size?.name },
          ...Boolean(newSizeName) ? [{ key: t('originalName'), text: size?.name }] : [],
          { key: t('devSeason'), text: size?.devSeason },
          { key: t('designer'), text: size?.designer },
          ...Boolean(size?.remarks) ? [{ key: t('remarks'), text: size?.remarks }] : [],
          { key: t('common:lastUpdate'), text: <LastUpdate item={size}/> }
        ]}
      />

      <SubTitle>{t('testings')}</SubTitle>
      <SimpleTable
        headerColor='info'
        headers={[
          { text: t('type') },
          { text: t('result') },
          { text: t('common:lastUpdate') },
        ]}
        data={testingDatas}
      />

      <SubTitle>{t('suggestPrices')}</SubTitle>
      <SuggestPricesDisplay/>

      <SubTitle>{t('vendors')}</SubTitle>
      <SimpleTable
        headerColor='success'
        headers={[
          { text: t('marketCode') },
          { text: t('brandRefCode') },
          { text: t('value') },
          { text: t('common:lastUpdate') },
        ]}
        data={vendorDatas}
      /> 

      <SubTitle>{t('usages')}</SubTitle>
      <SimpleTable
        headerColor='error'
        headers={[
          { text: t('marketCode') },
          { text: t('brandRefCode') },
          { text: t('value') },
          { text: t('common:lastUpdate') },
        ]}
        data={usageDatas}
      />

      <EditSalesButton to='/sales/new'/>
    </>
  )
}