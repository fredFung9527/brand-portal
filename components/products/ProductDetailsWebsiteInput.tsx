import { Grid, Paper } from '@mui/material'
import { debounce, filter, includes, map, sortBy } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useRef } from 'react'
import { MyInputProps } from '../../@types/input'
import { demoProductTages } from '../../demo/product'
import { checkDateOptional, checkRequired } from '../../utils/rules'
import MyForm from '../form/MyForm'
import MyCheckBox from '../MyCheckBox'
import MyAutocomplete from '../select/MyAutocomplete'
import SubTitle from '../SubTitle'

function CommonTagsInput({value, onChange}: MyInputProps) {
  function getValue(tag) {
    return includes(value, tag.id)
  }
  function setValue(v, tag) {
    if (v) {
      onChange([...value, tag.id])
    } else {
      onChange(filter(value, it => it !== tag.id))
    }
  }
  const allCommonTags = sortBy(filter(demoProductTages, it => it.type === 'Common'), it => it.showOrder)

  return (
    <Grid container columnSpacing={2}>
      {map(allCommonTags, tag =>
        <Grid item key={tag.id}>
          <MyCheckBox value={getValue(tag)} onChange={(v) => setValue(v, tag)} label={tag.name}/>
        </Grid>
      )}
    </Grid>
  )
}

export default function ProductDetailsWebsiteInput({
  value, onChange, showError, onValid
}: MyInputProps & {showError: boolean, onValid: any}) {
  const { t } = useTranslation('products')

  const onChangeDebounce = useRef(
    debounce((v) => {
      onChange && onChange(v)
    }, 500)
  ).current

  if (!value) {
    return null
  }
  return (
    <>
      <SubTitle>{t('productDetails')}</SubTitle>
      <Paper sx={{p: 2}}>
        <MyForm
          onChange={onChangeDebounce}
          onValid={onValid}
          items={[
            {
              key: 'shortForm',
              default: value.shortForm,
              label: t('shortForm'),
              rules: [checkRequired(t('error:required'))],
              type: 'text',
              grid: { xs: 12, sm: 6 }
            },
            {
              key: 'publishFrom',
              default: value.publishFrom,
              label: t('publishFrom'),
              rules: [checkDateOptional(t('error:invalidDate'))],
              type: 'date',
              grid: { xs: 6, sm: 3 }
            },
            {
              key: 'publishUntil',
              default: value.publishUntil,
              label: t('publishUntil'),
              rules: [checkDateOptional(t('error:invalidDate'))],
              type: 'date',
              grid: { xs: 6, sm: 3 }
            },
            {
              key: 'commonTags',
              default: value.commonTags,
              label: null,
              rules: null,
              type: 'custom',
              component: <CommonTagsInput/>,
              grid: 12
            },
            {
              key: 'productTypes',
              default: value.productTypes,
              label: t('productTypes'),
              rules: null,
              type: 'custom',
              component: <MyAutocomplete multiple items={['Demo Options']}/>,
              grid: { xs: 12, sm: 6 }
            },
            {
              key: 'keywords',
              default: value.keywords,
              label: t('keywords'),
              rules: null,
              type: 'custom',
              component: <MyAutocomplete multiple items={['Demo Options']}/>,
              grid: { xs: 12, sm: 6 }
            },
            {
              key: 'features',
              default: value.features,
              label: t('features'),
              rules: null,
              type: 'custom',
              component: <MyAutocomplete multiple items={['Demo Options']}/>,
              grid: { xs: 12, sm: 6 }
            },
            {
              key: 'collections',
              default: value.collections,
              label: t('collections'),
              rules: null,
              type: 'custom',
              component: <MyAutocomplete multiple items={['Demo Options']}/>,
              grid: { xs: 12, sm: 6 }
            },
            {
              key: 'showcaseSeasons',
              default: value.showcaseSeasons,
              label: t('showcaseSeasons'),
              rules: null,
              type: 'custom',
              component: <MyAutocomplete multiple items={['Demo Options']}/>,
              grid: { xs: 12, sm: 6 }
            }
          ]}
          showError={showError}
        />
      </Paper>
    </>
  )
}