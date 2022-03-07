import { MyInputProps } from '../../@types/input'
import { demoProductBasics } from '../../demo/product'
import MyAutocomplete from '../select/MyAutocomplete'
import { join } from 'lodash'

export default function ProductBasicPicker(props: MyInputProps) {
  return (
    <MyAutocomplete
      {...props}
      items={demoProductBasics}
      getOptionLabel={(option) => {
        return `${option.name} / ${option.target}${option.limitedMarketCodes?.length ? ` / ${join(option.limitedMarketCodes, ', ')}` : ''}`
      }}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
    />
  )
}