import { DatePicker, DateTimePicker, TimePicker } from '@mui/lab'
import { TextField } from '@mui/material'
import { MyDatePickerProps } from '../../@types/input'
import MyLocalizationProvider from './MyLocalizationProvider'

export default function MyDatePicker({
  type='date', required, variant, error, hideHelperText, helperText, ...otherProps
}: MyDatePickerProps) {
  const props = {
    ...otherProps,
    clearable: true,
    renderInput: (params) => 
      <TextField 
        {...params}
        fullWidth
        variant={variant || 'standard'}
        error={error}
        required={required}
        helperText={hideHelperText ? '' : (helperText || ' ')}
      />
  }
  
  let component = null
  switch(type) {
    case 'date':
      component = <DatePicker {...props as any}/>
      break
    case 'time':
      <TimePicker {...props as any}/>
      break
    case 'month':
      component = <DatePicker {...props as any} views={['year', 'month']}/>
      break
    default:
      component = <DateTimePicker {...props as any}/>
      break
  }

  return (
    <MyLocalizationProvider>
      {component}
    </MyLocalizationProvider>
  )
}