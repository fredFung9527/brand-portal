import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'
import { MyTextFieldProps } from '../../@types/input'
import MyTextField from '../form/MyTextField'
import MyAutocomplete from '../select/MyAutocomplete'

const TextMask = forwardRef(
  function TextMaskCustom(props, ref) {
    const { onChange, ...others } = props as any
    return (
      <IMaskInput
        {...others}
        mask='#$00'
        definitions={{
          '#': /[A-Z]/,
          '$': /[A-Z0-9]/
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: others.name, value } })
        }
        overwrite
      />
    )
  }
)

export default function ProductSeasonInput({single, ...otherProps}: MyTextFieldProps & {single?: boolean}) {
  if (single) {
    return (
      <MyTextField
        {...otherProps}
        inputComponent={TextMask}
      />
    )
  }

  return (
    <MyAutocomplete
      freeSolo
      multiple
      items={[]}
      inputComponent={TextMask}
      {...otherProps}
    />
  )
}