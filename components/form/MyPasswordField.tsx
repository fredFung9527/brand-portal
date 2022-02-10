import { useState } from 'react'
import MyTextField from './MyTextField'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { IconButton } from '@mui/material'
import { MyTextFieldProps } from '../../@types/input'

export default function MyPasswordField({label, ...otherProps}: MyTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <MyTextField
      {...otherProps}
      label={label || 'Password'}
      type={showPassword ? 'text' : 'password'}
      actions={
        <IconButton onClick={_ => setShowPassword(!showPassword)}>
          {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
        </IconButton>
      }
    />
  )
}