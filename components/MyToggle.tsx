import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { map } from 'lodash'
import { MyToggleProps } from '../@types/input'

export default function MyToggle({multiple, value, items, onChange, spacing, minWidth, required=true}: MyToggleProps) {
  function handleUpdate(_, v) {
    if (required) {
      if (v) {
        onChange && onChange(v)
      }
    } else {
      onChange && onChange(v)
    }
  }

  return (
    <ToggleButtonGroup
      exclusive={!multiple}
      value={value}
      onChange={handleUpdate}
    >
      {map(items, item =>
        <ToggleButton 
          key={item.value} 
          value={item.value} 
          sx={(theme) => ({
            borderRadius: theme.spacing(spacing || 2),
            minWidth: minWidth || 55
          })}
        >
          { item.text }
        </ToggleButton>  
      )}
    </ToggleButtonGroup>
  )
}