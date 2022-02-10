import MyAutocomplete from '../select/MyAutocomplete'
import { MyTextFieldProps } from '../../@types/input'
import { map } from 'lodash'
import { demoMaterials } from '../../demo/material'

export default function ProductMaterialInput(props: MyTextFieldProps) {
  return (
    <MyAutocomplete
      {...props}
      multiple
      items={demoMaterials}
      getOptionLabel={(option) => option.name || option}
      isOptionEqualToValue={(option, value) => option.name === value}
      onChange={(newValue) => props.onChange && props.onChange(map(newValue, it => it.name || it))}
    />
  )
}