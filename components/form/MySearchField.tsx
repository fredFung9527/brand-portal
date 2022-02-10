import { TextField } from '@mui/material'
import { MyInputProps } from '../../@types/input'
import SearchIcon from '@mui/icons-material/Search'

export default function MySearchField({label, value, onChange, ...otherProps}: MyInputProps) {
  return (
    <TextField
      size='small'
      InputProps={{
        startAdornment: <SearchIcon sx={{mr: 1}}/>
      }}
      sx={(theme) => 
        ({
          maxWidth: 190,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: theme.spacing(2)
            },
          },
        })
      }
      placeholder={label}
      value={value}
      onChange={event => onChange && onChange(event.target.value)}
      {...otherProps}
    />
  )
}