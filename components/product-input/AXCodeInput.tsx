import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'
import { MyTextFieldProps } from '../../@types/input'
import MyTextField from '../form/MyTextField'

const TextMask = forwardRef(
  function TextMaskCustom(props, ref) {
    const { onChange, ...others } = props as any
    return (
      <IMaskInput
        {...others}
        mask='000-00000-000000'
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: others.name, value } })
        }
        overwrite
      />
    )
  }
)

export default function AXCodeInput(props: MyTextFieldProps) {
  return (
    <MyTextField
      {...props}
      inputComponent={TextMask}
    />
  )
}