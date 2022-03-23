import { filter, forEach, reduce } from 'lodash'
import { MyTextFieldProps } from '../../@types/input'
import { demoProductBasics, demoProductSizes } from '../../demo/product'
import MyAutocomplete from '../select/MyAutocomplete'

export default function SizePicker(props: MyTextFieldProps) {
  const options = reduce(demoProductBasics, (result, product) => {
    const sizes = filter(demoProductSizes, size => size.productBasicId === product.id)
    forEach(sizes, size => {
      result.push({...size, product})
    })
    return result
  }, [])
  
  return (
    <MyAutocomplete
      {...props}
      items={options}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => `${option.product?.name} / ${option.product?.target} / ${option.name}`}
    />
  )
}