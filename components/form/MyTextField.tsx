import { IconButton, InputAdornment, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { MyTextFieldProps } from '../../@types/input'

export default function MyTextField({
  startIcon, actions, multiline, hideHelperText, notClearable, onChange, readOnly, inputComponent, ...otherProps
}: MyTextFieldProps) {
  const startAdornment = startIcon ? <InputAdornment position='start'>{startIcon}</InputAdornment> : null
  const endAdornment =
    <InputAdornment position='end'>
      <>
        {actions}
        {readOnly ?
          <IconButton edge='end' onClick={_ => navigator.clipboard.writeText(otherProps.value || '')} title='Copy'>
            <ContentCopyIcon/>
          </IconButton> :
          (notClearable ? 
            null:
            <IconButton 
              edge='end' 
              onClick={_ => otherProps?.disabled ? null : onChange && onChange('')} 
              title='Clear'
            >
              <CloseIcon/>
            </IconButton>
          )
        }
      </>
    </InputAdornment>

  return (
    <TextField
      {...otherProps}
      InputProps={{
        readOnly,
        startAdornment,
        endAdornment,
        inputComponent
      }}
      multiline={multiline}
      minRows={multiline ? 3 : null}
      fullWidth
      helperText={hideHelperText ? '' : (otherProps.helperText || ' ')}
      onChange={event => onChange && onChange(event.target.value)}
      variant={otherProps.variant || 'standard'}
    />
  )
}