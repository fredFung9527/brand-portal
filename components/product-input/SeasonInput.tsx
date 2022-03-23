import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'
import { MyTextFieldProps } from '../../@types/input'
import MyTextField from '../form/MyTextField'
import MyAutocomplete from '../select/MyAutocomplete'

const SeasonMask = forwardRef(
  function Mask(props, ref) {
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

const SeasonOrYearMask = forwardRef(
  function Mask(props, ref) {
    const { onChange, ...others } = props as any
    return (
      <IMaskInput
        {...others}
        mask='$$00'
        definitions={{
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

export default function SeasonInput({
  multiple, orYear, ...otherProps
}: MyTextFieldProps & {multiple?: boolean, orYear?: boolean}) {
  if (multiple) {
    return (
      <MyAutocomplete
        freeSolo
        multiple
        items={[]}
        inputComponent={orYear ? SeasonOrYearMask: SeasonMask}
        {...otherProps}
      />
    )
  }

  return (
    <MyTextField
      {...otherProps}
      inputComponent={orYear ? SeasonOrYearMask: SeasonMask}
    />
  )
}