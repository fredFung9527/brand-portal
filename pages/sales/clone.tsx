import { Grid } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import MyCheckBox from '../../components/MyCheckBox'
import { getOnSalesDetails } from '../../utils/sales'
import NewSales from './new'
import { find } from 'lodash'

export default function CloneSales({cloneFrom}) {
  const { t } = useTranslation('products')

  const size = cloneFrom?.size
  const product = cloneFrom?.product
  const oldSalesPart = {
    marketCode: cloneFrom?.marketCode,
    brandRefCode: cloneFrom?.brandRefCode,
    devSeason: size?.devSeason,
    industries: product?.industries,
    remarks: cloneFrom?.remarks
  }
  const oldProductPart = {
    name: product?.name,
    status: product?.status,
    description: product?.description,
    remarks: product?.remarks,
    target: product?.target,
    limitedMarketCodes: product?.limitedMarketCodes,
    photo: product?.photo,
    threeDPhoto: product?.threeDPhoto,
    newProductName: cloneFrom?.newProductName,
    designer: size?.name
  }
  const oldSizePart = {
    name: size?.name,
    newSizeName: cloneFrom?.newSizeName,
    remarks: size?.remarks,
  }
  function getFromSizeInformations(type) {
    return find(cloneFrom?.sizeInfomations, it => it.type === type)?.detail
  }
  const oldOthersPart = {
    moldCharge: getFromSizeInformations('Mold Charge'),
    bulkLeadtime: getFromSizeInformations('Bulk Leadtime'),
    bulkOrderMoq: getFromSizeInformations('Bulk Order MOQ'),
    bulkColorMoq: getFromSizeInformations('Bulk Color MOQ'),
    incoTerm: getFromSizeInformations('Incoterm')
  }

  const [asNewProduct, setAsNewProduct] = useState(false)
  const [asNewSize, setAsNewSize] = useState(false)

  return (
    <>
      <Grid container columnSpacing={2}>
        <Grid item>
          <MyCheckBox label={t('asNewProduct')} value={asNewProduct} onChange={setAsNewProduct} hideHelperText/>
        </Grid>
        <Grid item>
          <MyCheckBox label={t('asNewSize')} value={asNewSize} onChange={setAsNewSize} hideHelperText/>
        </Grid>
      </Grid>

      <NewSales 
        oldSalesPart={oldSalesPart}
        oldProductPart={oldProductPart}
        oldSizePart={oldSizePart}
        oldComponentsPart={cloneFrom?.components}
        oldPricesPart={cloneFrom?.prices}
        oldTestingsPart={[]}
        oldOthersPart={oldOthersPart}
        disableEditProduct={!asNewProduct}
        disableEditSize={!asNewSize}
      />
    </>
  )
}

CloneSales.needLogin = true

export async function getServerSideProps({query}) {
  return {
    props: {
      cloneFrom: getOnSalesDetails(query?.id)
    }
  }
}