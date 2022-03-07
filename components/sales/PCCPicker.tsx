import { MyInputProps } from '../../@types/input'
import { demoPCCs } from '../../demo/product'
import MyAutocomplete from '../select/MyAutocomplete'
import { filter } from 'lodash'

export default function PCCPicker({productSizeId, ...otherProps}: MyInputProps & {productSizeId: number}) {
  const options = productSizeId ? filter(demoPCCs, it => it.productSizeId === productSizeId) : []

  return (
    <MyAutocomplete
      {...otherProps}
      items={options}
      disabled={!options?.length}
      getOptionLabel={(option) => {
        return option.name
      }}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
    />
  )
}