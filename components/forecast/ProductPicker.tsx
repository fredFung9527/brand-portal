import MyAutocomplete from '../select/MyAutocomplete'
import { MyTextFieldProps } from '../../@types/input'
import { join, map } from 'lodash'
import { demoProducts } from '../../demo/product'

export default function ProductPicker(props: MyTextFieldProps) {
  return (
    <MyAutocomplete
      {...props}
      items={demoProducts}
      getOptionLabel={(option) => `${option.name} / ${option.productType} / ${join(option.seasons, ', ')}`}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  )
}