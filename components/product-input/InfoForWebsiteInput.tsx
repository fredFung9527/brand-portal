import { Grid, Paper } from '@mui/material'
import { debounce, filter, includes, map, sortBy } from 'lodash'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useRef, useState } from 'react'
import { MyInputProps } from '../../@types/input'
import { demoProductTages } from '../../demo/product'
import MyDatePicker from '../datetime/MyDatePicker'
import MyTextField from '../form/MyTextField'
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
          <MyCheckBox value={getValue(tag)} onChange={(v) => setValue(v, tag)} label={tag.name} hideHelperText/>
        </Grid>
      )}
    </Grid>
  )
}

export default function InfoForWebsiteInput({
  value, onChange, showError, onValid
}: MyInputProps & {showError: boolean, onValid: any}) {
  const { t } = useTranslation('products')

  const [shortForm, setShortForm] = useState(value?.shortForm || '')
  const [publishFrom, setPublishFrom] = useState(value?.publishFrom || null)
  const [publishUntil, setPublishUntil] = useState(value?.publishUntil || null)
  const [commonTags, setCommonTags] = useState(value?.commonTags || [])
  const [productTypes, setProductTypes] = useState(value?.productTypes || [])
  const [keywords, setKeywords] = useState(value?.keywords || [])
  const [collections, setCollections] = useState(value?.collections || [])
  const [showcaseSeasons, setShowcaseSeasons] = useState(value?.showcaseSeasons || [])

  const onChangeDebounce = useRef(
    debounce((v) => {
      onChange && onChange(v)
    }, 500)
  ).current
  const onValidDebounce = useRef(
    debounce((v) => {
      onValid && onValid(Boolean(v))
    }, 500)
  ).current

  useEffect(() => {
    onChangeDebounce({shortForm, publishFrom, publishUntil, commonTags, productTypes, keywords, collections, showcaseSeasons})
    onValidDebounce(shortForm && productTypes.length && collections.length && showcaseSeasons.length)
  }, [shortForm, publishFrom, publishUntil, commonTags, productTypes, keywords, collections, showcaseSeasons])

  return (
    <>
      <SubTitle>{t('productDetails')}</SubTitle>
      <Paper sx={{p: 2}}>
        <Grid container columnSpacing={2} alignItems='flex-end'>
          <Grid item xs={12} sm={6}>
            <MyTextField
              label={t('shortForm')}
              value={shortForm}
              onChange={setShortForm}
              error={showError && !Boolean(shortForm)}
              helperText={showError && !Boolean(shortForm) && t('error:required')}
              required
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <MyDatePicker
              label={t('publishFrom')}
              value={publishFrom}
              onChange={setPublishFrom}
              error={showError && publishFrom && !moment(publishFrom).isValid()}
              helperText={showError && publishFrom && !moment(publishFrom).isValid() && t('error:invalidDate')}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <MyDatePicker
              label={t('publishUntil')}
              value={publishUntil}
              onChange={setPublishUntil}
              error={showError && publishUntil && !moment(publishUntil).isValid()}
              helperText={showError && publishUntil && !moment(publishUntil).isValid() && t('error:invalidDate')}
            />
          </Grid>
          <Grid item xs={12}>
            <CommonTagsInput value={commonTags} onChange={setCommonTags}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyAutocomplete
              label={t('productTypes')}
              value={productTypes}
              onChange={setProductTypes}
              error={showError && !Boolean(productTypes.length)}
              helperText={showError && !Boolean(productTypes.length) && t('error:required')}
              required
              multiple 
              items={['Demo Options']}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyAutocomplete
              label={t('keywords')}
              value={keywords}
              onChange={setKeywords}
              multiple 
              items={['Demo Options']}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyAutocomplete
              label={t('collections')}
              value={collections}
              onChange={setCollections}
              error={showError && !Boolean(collections.length)}
              helperText={showError && !Boolean(collections.length) && t('error:required')}
              required
              multiple 
              items={['Demo Options']}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyAutocomplete
              label={t('showcaseSeasons')}
              value={showcaseSeasons}
              onChange={setShowcaseSeasons}
              error={showError && !Boolean(showcaseSeasons.length)}
              helperText={showError && !Boolean(showcaseSeasons.length) && t('error:required')}
              required
              multiple
              freeSolo
              items={['W22']}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}