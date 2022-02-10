import MyAutocomplete from '../select/MyAutocomplete'
import { MyTextFieldProps } from '../../@types/input'
import { map } from 'lodash'
import { demoColors } from '../../demo/color'

export default function ProductColorInput(props: MyTextFieldProps) {
  return (
    <MyAutocomplete
      {...props}
      freeSolo
      multiple
      items={demoColors}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option
        } else {
          return `${option.internalColorCode} / ${option.externalName}`
        }
      }}
      isOptionEqualToValue={(option, value) => option.internalColorCode === value}
      onChange={(newValue) => props.onChange && props.onChange(map(newValue, it => it.internalColorCode || it))}
    />
  )
}