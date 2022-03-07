import MyAutocomplete from '../select/MyAutocomplete'
import { MyTextFieldProps } from '../../@types/input'
import { forEach } from 'lodash'
import { demoMyBrands } from '../../demo/user'

export default function ProductMarketCodeInput({single, ...otherProps}: MyTextFieldProps & {single?: boolean}) {
  let options = []
  forEach(demoMyBrands, it => options = [...options, ...(it.marketCodes || [])])
  
  return (
    <MyAutocomplete
      multiple={!single}
      {...otherProps}
      items={options}
    />
  )
}