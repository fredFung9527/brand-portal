import { MyInputProps } from '../../@types/input'
import { demoProductSizes } from '../../demo/product'
import MyAutocomplete from '../select/MyAutocomplete'
import { filter } from 'lodash'

export default function ProductSizePicker({productBasicId, ...otherProps}: MyInputProps & {productBasicId: number}) {
  const options = productBasicId ? filter(demoProductSizes, it => it.productBasicId === productBasicId) : []

  return (
    <MyAutocomplete
      {...otherProps}
      items={options}
      disabled={!options?.length}
      getOptionLabel={(option) => {
        return option.sizeName
      }}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
    />
  )
}