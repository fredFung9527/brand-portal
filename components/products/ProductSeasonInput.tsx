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

export default function ProductSeasonInput(props: MyTextFieldProps) {
  return (
    <MyAutocomplete
      freeSolo
      multiple
      items={[]}
      inputComponent={TextMask}
      {...props}
    />
  )
}

export function ProductDevSeasonInput(props: MyTextFieldProps) {
  return (
    <MyTextField
      {...props}
      inputComponent={TextMask}
    />
  )
}