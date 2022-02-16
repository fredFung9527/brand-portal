import { Button, Grid, Paper, Typography } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useState } from 'react'
import MyForm from '../../components/form/MyForm'
import ProductPriceHistoryInput from '../../components/products/ProductPriceHistoryInput'
import ProductStatusPicker from '../../components/products/ProductStatusPicker'
import MyAutocomplete from '../../components/select/MyAutocomplete'
import SubTitle from '../../components/SubTitle'
import { demoTargets } from '../../demo/brand'
import { demoCurrencies, demoIncoTerms, demoProductTypes, demoProdutcUnits } from '../../demo/product'
import { checkPrice, checkPriceHistoy, checkRequired } from '../../utils/rules'
import { demoSuppliers } from '../../demo/production'
import MyFilePicker from '../../components/MyFilePicker'
import MyImage from '../../components/MyImage'
import My3DViewer from '../../components/My3DViewer'
import ProductSeasonInput, { ProductDevSeasonInput } from '../../components/products/ProductSeasonInput'
import ProductMarketCodeInput from '../../components/products/ProductMarketCodeInput'
import { demoDesigners } from '../../demo/user'
import ProductMaterialInput from '../../components/products/ProductMaterialInput'
import ProductSizeInput from '../../components/products/ProductSizeInput'
import ProductColorInput from '../../components/products/ProductColorInput'
import ProductPullTestInput from '../../components/products/ProductPullTestInput'
import { useSetRecoilState } from 'recoil'
import { recoilAlert } from '../../recoil/common'
import UploadButton from '../../components/forecast/UploadButton'

const emptyProduct = {
  status: 'Testing',
  name: '',
  productType: '',
  materials: [],
  colors: [],
  sizes:[],
  itemCodes: [],
  description: '',
  currency: 'USD',
  price: '',
  unit: 'PCS',
  priceHistory: [],
  target: 'Custom',
  marketCodes: [],
  seasons: [],
  devSeason: '',
  effectiveSeason: '',
  designer: '',
  moldCharge: '',
  bulkLeadtime: '',
  bulkOrderMoq: '',
  bulkColorMoq: '',
  supplier: '',
  incoTerm: null,
  pullTest: '',
  otherTest: '',
  remarks: '',
  photo: null,
  threeDPhoto: null
}

export default function NewProduct() {
  const { t } = useTranslation('products')
  const setAlert = useSetRecoilState(recoilAlert)

  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [product, setProduct] = useState<any>(emptyProduct)
  const [p1IsValid, setP1IsValid] = useState(false)
  const [p2IsValid, setP2IsValid] = useState(false)
  const [p3IsValid, setP3IsValid] = useState(false)
  const [p4IsValid, setP4IsValid] = useState(false)
  const [p5IsValid, setP5IsValid] = useState(false)
  const [p6IsValid, setP6IsValid] = useState(false)

  const setStaus = useCallback((v) => {
    setProduct({ ...product, status: v })
  }, [product])
  const handleInput = useCallback((v) => {
    setProduct({...product, ...v})
  }, [product])

  function tryUpload() {
    setShowError(true)
    if (loading) {
      return
    }
    if (!p1IsValid || !p2IsValid || !p3IsValid || !p4IsValid || !p5IsValid || !p6IsValid) {
      setAlert(`error:${t('error:insufficientInfo')}`)
      window.scrollTo({top: 0, behavior: 'smooth'})
      return
    }
    setLoading(true)
    setTimeout(() => {
      setAlert(t('common:finish'))
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <ProductStatusPicker 
        label={<Typography variant='h6'>{t('status')}</Typography>} 
        value={product.status} 
        onChange={setStaus}
      />

      <SubTitle>{t('basic')}</SubTitle>
      <Paper sx={{p: 2}}>
        <MyForm
          onChange={handleInput}
          onValid={setP1IsValid}
          items={[
            {
              key: 'name',
              default: product.name,
              label: t('name'),
              rules: product.status === 'Testing' ? null : [checkRequired(t('error:required'))],
              type: 'text',
              grid: { xs: 12, sm: 6 }
            },
            {
              key: 'productType',
              default: product.productType,
              label: t('productType'),
              rules: product.status === 'Testing' ? null : [checkRequired(t('error:required'))],
              type: 'custom',
              grid: { xs: 12, sm: 6 },
              component: <MyAutocomplete freeSolo items={demoProductTypes}/>
            },
            {
              key: 'materials',
              default: product.materials,
              label: t('materials'),
              rules: product.status === 'Testing' ? null : [checkRequired(t('error:required'))],
              type: 'custom',
              grid: { xs: 12, sm: 6 },
              component: <ProductMaterialInput/>
            },
            {
              key: 'colors',
              default: product.colors,
              label: t('colors'),
              rules: null,
              type: 'custom',
              grid: { xs: 12, sm: 6 },
              component: <ProductColorInput/>
            },
            {
              key: 'sizes',
              default: product.sizes,
              label: t('sizes'),
              rules: product.status === 'Testing' ? null : [checkRequired(t('error:required'))],
              type: 'custom',
              grid: { xs: 12, sm: 6 },
              component: <ProductSizeInput/>
            },
            {
              key: 'itemCodes',
              default: product.itemCodes,
              label: t('itemCodes'),
              rules: null,
              type: 'custom',
              grid: { xs: 12, sm: 6 },
              component: <MyAutocomplete freeSolo multiple items={[]}/>
            },
            {
              key: 'description',
              default: product.description,
              label: t('description'),
              rules: null,
              type: 'text',
              grid: { xs: 12 }
            },
          ]}
          showError={showError}
          updateHelper={product.status}
        />
      </Paper>

      <SubTitle>{t('price')}</SubTitle>
      <Paper sx={{p: 2}}>
        <MyForm
          onChange={handleInput}
          onValid={setP2IsValid}
          items={[
            {
              key: 'currency',
              default: product.currency,
              label: t('currency'),
              type: 'select',
              items: demoCurrencies,
              grid: { xs: 12, sm: 6 }
            },
            {
              key: 'price',
              default: product.price,
              label: t('price'),
              rules: product.status === 'Testing' ? null : [checkPrice(t('error:wrongPrice'))],
              type: 'number',
              grid: { xs: 12, sm: 6 }
            },
            {
              key: 'unit',
              default: product.unit,
              label: t('unit'),
              type: 'select',
              items: demoProdutcUnits,
              grid: { xs: 12, sm: 6 }
            },
            {
              key: 'priceHistory',
              default: product.priceHistory,
              label: t('priceHistory'),
              rules: product.status === 'Testing' ? null : [checkPriceHistoy(t('error:required'))],
              type: 'custom',
              grid: { xs: 12 },
              component: <ProductPriceHistoryInput/>
            },
          ]}
          showError={showError}
          updateHelper={product.status}
        />
      </Paper>

      <SubTitle>{t('brand')}</SubTitle>
      <Paper sx={{p: 2}}>
        <MyForm
          onChange={handleInput}
          onValid={setP3IsValid}
          items={[
            {
              key: 'target',
              default: product.target,
              label: t('target'),
              rules: product.status === 'Testing' ? null : [checkRequired(t('error:required'))],
              type: 'select',
              grid: { xs: 12, sm: 6 },
              items: demoTargets
            },
            ...product.target === 'Custom' ? 
              [{
                  key: 'marketCodes',
                  default: product.marketCodes,
                  label: t('marketCodes'),
                  rules: product.status === 'Testing' ? null : [checkRequired(t('error:required'))],
                  type: 'custom',
                  grid: { xs: 12, sm: 6 },
                  component: <ProductMarketCodeInput/>
              }] as any : 
              [],
            {
              key: 'seasons',
              default: product.seasons,
              label: t('seasons'),
              rules: product.status === 'Testing' ? null : [checkRequired(t('error:required'))],
              type: 'custom',
              grid: { xs: 12, sm: 6 },
              component: <ProductSeasonInput/>
            }
          ]}
          showError={showError}
          updateHelper={product.status + product.target}
        />
      </Paper>

      <SubTitle>{t('development')}</SubTitle>
      <Paper sx={{p: 2}}>
      <MyForm
        onChange={handleInput}
        onValid={setP4IsValid}
        items={[
          {
            key: 'devSeason',
            default: product.devSeason,
            label: t('devSeason'),
            rules: product.status === 'Testing' ? null : [checkRequired(t('error:required'))],
            type: 'custom',
            grid: { xs: 12, sm: 6 },
            component: <ProductDevSeasonInput/>
          },
          {
            key: 'effectiveSeason',
            default: product.effectiveSeason,
            label: t('effectiveSeason'),
            rules: product.status === 'Testing' ? null : [checkRequired(t('error:required'))],
            type: 'custom',
            grid: { xs: 12, sm: 6 },
            component: <ProductDevSeasonInput/>
          },
          {
            key: 'designer',
            default: product.designer,
            label: t('designer'),
            rules: product.status === 'Testing' ? null : [checkRequired(t('error:required'))],
            type: 'custom',
            grid: { xs: 12, sm: 6 },
            component: <MyAutocomplete freeSolo items={demoDesigners}/>
          },
        ]}
        showError={showError}
        updateHelper={product.status}
      />
      </Paper>

      <SubTitle>{t('production')}</SubTitle>
      <Paper sx={{p: 2}}>
        <MyForm
          onChange={handleInput}
          onValid={setP5IsValid}
          items={[
            {
              key: 'moldCharge',
              default: product.moldCharge,
              label: t('moldCharge'),
              rules: null,
              type: 'number',
              grid: { xs: 12, sm: 6 },
            },
            {
              key: 'bulkLeadtime',
              default: product.bulkLeadtime,
              label: t('bulkLeadtime'),
              rules: null,
              type: 'number',
              grid: { xs: 12, sm: 6 },
            },
            {
              key: 'bulkOrderMoq',
              default: product.bulkOrderMoq,
              label: t('bulkOrderMoq'),
              rules: null,
              type: 'number',
              grid: { xs: 12, sm: 6 },
            },
            {
              key: 'bulkColorMoq',
              default: product.bulkColorMoq,
              label: t('bulkColorMoq'),
              rules: null,
              type: 'text',
              grid: { xs: 12, sm: 6 },
            },
            {
              key: 'supplier',
              default: product.supplier,
              label: t('supplier'),
              rules: null,
              type: 'custom',
              grid: { xs: 12, sm: 6 },
              component: <MyAutocomplete freeSolo items={demoSuppliers}/>
            },
            {
              key: 'incoTerm',
              default: product.incoTerm,
              label: t('incoTerm'),
              rules: null,
              type: 'custom',
              grid: { xs: 12, sm: 6 },
              component: <MyAutocomplete items={demoIncoTerms}/>
            },
          ]}
          showError={showError}
          updateHelper={product.status}
        />
      </Paper>

      <SubTitle>{t('others')}</SubTitle>
      <Paper sx={{p: 2}}>
        <MyForm
          onChange={handleInput}
          onValid={setP6IsValid}
          items={[
            {
              key: 'pullTest',
              default: product.pullTest,
              label: t('pullTest'),
              rules: null,
              type: 'custom',
              grid: { xs: 12, sm: 6 },
              component: <ProductPullTestInput/>
            },
            {
              key: 'otherTest',
              default: product.otherTest,
              label: t('otherTest'),
              rules: null,
              type: 'text',
              grid: { xs: 12, sm: 6 },
            },
            {
              key: 'remarks',
              default: product.remarks,
              label: t('remarks'),
              rules: null,
              type: 'textArea',
              grid: { xs: 12 },
            },
          ]}
          showError={showError}
          updateHelper={product.status}
        />
      </Paper>

      <SubTitle>{t('files')}</SubTitle>
      <Paper sx={{p: 2}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography sx={(theme) => ({color: theme.palette.grayLabelText.main})}>
              {t('photo')}
            </Typography>
            <Button fullWidth>
              <MyFilePicker onChange={(v) => handleInput({photo: v})}>
                <MyImage src={product.photo || '/images/photo.png'} width={150} height={150}/>
              </MyFilePicker>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={(theme) => ({color: theme.palette.grayLabelText.main})}>
              {t('threeDPhoto')}
            </Typography>
            <Button fullWidth>
              <MyFilePicker onChange={(v) => handleInput({threeDPhoto: v})} accept='.gltf'>
                {Boolean(product.threeDPhoto) ?
                  <My3DViewer src={product.threeDPhoto} height={150}/> : 
                  <MyImage src='/images/3d.png' width={150} height={150}/>
                }
              </MyFilePicker>
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <UploadButton loading={loading} onClick={tryUpload}/>
    </>
  )
}

NewProduct.needLogin = true