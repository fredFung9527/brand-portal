import MyAutocomplete from '../select/MyAutocomplete'
import { MyTextFieldProps } from '../../@types/input'
import { demoColors } from '../../demo/colors'
import useTranslation from 'next-translate/useTranslation'
import { filter } from 'lodash'

export default function ColorPicker({
  onChange, marketCode, ...otherProps
}: MyTextFieldProps & {single?: boolean, marketCode?: string}) {
  const { t } = useTranslation('products')
  
  return (
    <MyAutocomplete
      {...otherProps}
      items={marketCode ? filter(demoColors, it => it.marketCode === marketCode) : []}
      freeSolo
      getOptionLabel={
        (option) => 
        typeof option === 'string' ?
          option : 
          `${option.colorCode} / ${option.material} / ${option.name} / ${option.status} / ${option.supplier}`
      }
      onChange={(v) => onChange(v ? (v.colorCode || v) : null)}
      isOptionEqualToValue={(option, value) => option.colorCode === value}
      helperText={marketCode ? '' : t('needMarketCode')}
    />
  )
}