import { filter } from 'lodash'
import { useEffect, useState } from 'react'
import { MyTextFieldProps } from '../../@types/input'
import { demoPCs } from '../../demo/product'
import MyAutocomplete from '../select/MyAutocomplete'

export default function ComponentPicker({sizeId, ...otherProps}: MyTextFieldProps & {sizeId?: Number}) {
  const [options, setOptions] = useState([])
  useEffect(() => {
    setOptions(filter(demoPCs, it => it.productSizeId === sizeId))
  }, [sizeId])
  
  return (
    <MyAutocomplete
      {...otherProps}
      items={options}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => `${option.type} / ${option.axCode}`}
    />
  )
}