import { Divider} from '@mui/material'
import { isEmpty, map, find } from 'lodash'
import NoResultHint from '../../components/NoResultHint'
import ProductDisplay from '../../components/products/ProductDisplay'
import MyTabs from '../../components/MyTabs'
import { useEffect, useState } from 'react'
import SizeCard from '../../components/products/SizeCard'
import { getProductDetails } from '../../utils/products'
import useTranslation from 'next-translate/useTranslation'
import PageActions from '../../components/products/PageActions'
import ComponentsDisplay from '../../components/sales/ComponentsDisplay'

function SizesPart({sizes}) {
  const tabs = map(sizes, it => ({ text: it.name, value: it.id}))
  const [tab, setTab] = useState(tabs[0]?.value || '')
  const [selectedSize, setSeletcedSize] = useState({})

  useEffect(() => {
    setSeletcedSize(find(sizes, it => it.id === tab))
  }, [tab])

  return (
    <>
      <Divider sx={{mb: 2}}/>
      <MyTabs
        value={tab}
        onChange={setTab} 
        items={tabs}
      />

      <SizeCard 
        size={selectedSize} 
      />
    </>
  )
}

function ComponentsPart({sizes}) {
  const tabs = map(sizes, it => ({ text: it.name, value: it.id}))
  const [tab, setTab] = useState(tabs[0]?.value || '')
  const [selectedSize, setSeletcedSize] = useState<any>(sizes[0] || {})

  useEffect(() => {
    setSeletcedSize(find(sizes, it => it.id === tab))
  }, [tab])

  return (
    <>
      <Divider sx={{mb: 2}}/>
      <MyTabs
        value={tab}
        onChange={setTab} 
        items={tabs}
        sx={{mb: 2}}
      />

      <ComponentsDisplay components={selectedSize.components} isGeneral/>
    </>
  )
}

export default function ProductDetail({product}) {
  const { t } = useTranslation('products')

  const tabs = [
    { text: t('product'), value: 'product'},
    { text: t('sizes'), value: 'sizes'},
    { text: t('components'), value: 'components'},
  ]
  const [tab, setTab] = useState(tabs[0]?.value)



  if (isEmpty(product)) {
    return (
      <NoResultHint/>
    )
  }
  return (
    <>
      <MyTabs value={tab} onChange={setTab} items={tabs} sx={{mb: 2}}/>
      {tab === 'product' &&
        <ProductDisplay product={product}/>
      }
      {tab === 'sizes' &&
        <SizesPart sizes={product?.sizes}/>
      }
      {tab === 'components' &&
        <ComponentsPart sizes={product?.sizes}/>
      }

      <PageActions 
        editPath='/products/new'
        clonePath='/products/new'
        onRemove={null}
      />
    </>
  )
}

ProductDetail.needLogin = true

export async function getServerSideProps({query}) {
  return {
    props: {
      product: getProductDetails(query?.id)
    }
  }
}