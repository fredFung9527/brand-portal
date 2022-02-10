import { indexOf } from 'lodash'
import { MyInputProps } from '../../@types/input'
import MyAutocomplete from '../select/MyAutocomplete'

export default function ProductSizeInput({noLimit, ...otherProps}: MyInputProps & { noLimit?: boolean }) {
  const isFreeSize = otherProps.value && otherProps.value[0] === 'Free'
  function handleInput(newValue) {
    if (noLimit) {
      otherProps.onChange && otherProps.onChange(newValue)
    } else {
      if (indexOf(newValue, 'Free') < 0) {
        otherProps.onChange && otherProps.onChange(newValue)
      } else {
        otherProps.onChange && otherProps.onChange(['Free'])
      }
    }
  }

  return (
    <MyAutocomplete 
      {...otherProps} 
      freeSolo={noLimit ? true : !isFreeSize} 
      multiple 
      items={['Free']}
      onChange={handleInput}
    />
  )
}