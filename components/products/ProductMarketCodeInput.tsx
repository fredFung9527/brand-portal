import MyAutocomplete from '../select/MyAutocomplete'
import { demoMarketCodes } from '../../demo/brand'
import { MyTextFieldProps } from '../../@types/input'
import { map } from 'lodash'

export default function ProductMarketCodeInput({single, ...otherProps}: MyTextFieldProps & {single?: boolean}) {
  if (single) {
    return (
      <MyAutocomplete
        {...otherProps}
        items={demoMarketCodes}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option
          } else {
            return `${option.marketCode} / ${option.name}`
          }
        }}
        isOptionEqualToValue={(option, value) => option.marketCode === value.marketCode}
      />
    )
  }
  
  return (
    <MyAutocomplete
      {...otherProps}
      multiple
      items={demoMarketCodes}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option
        } else {
          return `${option.marketCode} / ${option.name}`
        }
      }}
      isOptionEqualToValue={(option, value) => option.marketCode === value}
      onChange={(newValue) => otherProps.onChange && otherProps.onChange(map(newValue, it => it.marketCode || it))}
    />
  )
}