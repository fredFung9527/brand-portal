import { FormHelperText, FormControlLabel, Checkbox } from '@mui/material'
import { MyCheckBoxProps, MyInputEvent } from '../@types/input'

export default function MyCheckBox({label, value, onChange, color, error, helperText, hideHelperText}: MyCheckBoxProps) {
  return (
    <>
      <FormControlLabel 
        control={<Checkbox checked={value} color={color || 'primary'}/>} 
        label={label}
        onChange={(event: MyInputEvent) => onChange && onChange(event.target.checked)}
      />
      {!hideHelperText && <FormHelperText error={error}>{helperText || ' '}</FormHelperText>}
    </>
  )
}