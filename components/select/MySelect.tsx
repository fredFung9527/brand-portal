import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { map } from 'lodash'
import { MySelectProps } from '../../@types/input'

export default function MySelect({
  variant, label, value, onChange, items, hideHelperText, helperText, readOnly, notMust, ...otherProps
}: MySelectProps) {
  return (
    <FormControl fullWidth variant={variant || 'standard'} {...otherProps}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        inputProps={{ readOnly }}
      >
        {notMust && 
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
        }
        {map(items, (item, idx) => 
          <MenuItem 
            key={idx} 
            value={item.value || (item.value === false ? false : item)}
          >
            {item.text || item}
          </MenuItem>
        )}
      </Select>
      {!hideHelperText && <FormHelperText>{helperText || ' '}</FormHelperText>}
    </FormControl>
  )
}