import useTranslation from 'next-translate/useTranslation'
import InformationTable from '../InformationTable'
import MyTabs from '../MyTabs'
import SubTitle from '../SubTitle'
import LastUpdate from './LastUpdate'
import PCCCard from './PCCCard'

export default function ProductSizeCard({
  size, newSizeName='', productMode=false, seletcedPCC=null, setSeletcedPCC=null,
  productSizeRef=null, pccRef=null
}) {
  const { t } = useTranslation('products')

  if (!size) {
    return null
  }
  return (
    <>
      <div ref={productSizeRef}>
        <SubTitle>{t('sizeDetails')}</SubTitle>
        <InformationTable
          data={[
            { key: t('sizeName'), text: newSizeName || size.sizeName },
            ...Boolean(newSizeName) ? [{ key: t('originalName'), text: size.sizeName }] : [],
            { key: t('devSeason'), text: size.devSeason },
            { key: t('effectiveSeason'), text: size.effectiveSeason },
            { key: t('designer'), text: size.designer },
            ...Boolean(size.remarks) ? [{ key: t('remarks'), text: size.remarks }] : [],
            { key: t('common:lastUpdate'), text: <LastUpdate item={size}/> }
          ]}
        />
      </div>

      {productMode && Boolean(size.pccs?.length) &&
        <>
          <MyTabs 
            onChange={setSeletcedPCC} 
            items={size.pccs}
            textKey='name'
            sx={{mt: 1, mb: -1}}
          />
          <PCCCard pcc={seletcedPCC} pccRef={pccRef}/>
        </>
      }
    </>
  )
}