import { forEach, join } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import InformationTable from '../InformationTable'
import SimpleTable from '../SimpleTable'
import SubTitle from '../SubTitle'
import LastUpdate from './LastUpdate'

export default function PCCCard({pcc, salesMode=false, pccRef=null}) {
  const { t } = useTranslation('products')
  const [componentTableData, setComponentTableData] = useState([])
  useEffect(() => {
    let list = []
    forEach(pcc?.components, it => {
      const lastUpdate = <LastUpdate item={it} mode='simple'/>
      list.push([it.axCode, it.type, join(it.materials, ', '), join(it.colors, ', '), lastUpdate])
      if (it.remarks) {
        list.push([`${t('remarks')}: ${it.remarks}`])
      }
    })
    setComponentTableData(list)
  }, [pcc])

  const [testingDatas, setTestingData] = useState([])
  useEffect(() => {
    let list = []
    forEach(pcc?.testings, it => {
      const lastUpdate = <LastUpdate item={it} mode='simple'/>
      list.push([it.type, it.result, lastUpdate])
    })
    setTestingData(list)
  }, [pcc])

  const [vendorDatas, setVendorData] = useState([])
  useEffect(() => {
    let list = []
    forEach(pcc?.vendors, it => {
      const lastUpdate = <LastUpdate item={it} mode='simple'/>
      list.push([it.marketCode, it.brandRefCode, it.value, lastUpdate])
    })
    setVendorData(list)
  }, [pcc])

  const [usageDatas, setUsageData] = useState([])
  useEffect(() => {
    let list = []
    forEach(pcc?.usages, it => {
      const lastUpdate = <LastUpdate item={it} mode='simple'/>
      list.push([it.marketCode, it.brandRefCode, it.value, lastUpdate])
    })
    setUsageData(list)
  }, [pcc])

  if (!pcc) {
    return null
  }
  return (
    <>
      <div ref={pccRef}>
        <SubTitle>{t('pccDetails')}</SubTitle>
        <InformationTable
          data={[
            { key: t('pccName'), text: pcc.name },
            ...Boolean(pcc.remarks) ? [{ key: t('remarks'), text: pcc.remarks }] : [],
            { key: t('common:lastUpdate'), text: <LastUpdate item={pcc}/> }
          ]}
        />

        <SubTitle>{t('components')}</SubTitle>
        <SimpleTable
          headers={[
            { text: t('axCode') },
            { text: t('componentType') },
            { text: t('materials') },
            { text: t('colors') },
            { text: t('common:lastUpdate') },
          ]}
          data={componentTableData}
        />
      </div>

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

      {!salesMode &&
        <>
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
        </>
      }
    </>
  )
}