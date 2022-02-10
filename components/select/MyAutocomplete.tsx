import { Autocomplete, TextField, Paper, Grow, PaperProps, createFilterOptions } from '@mui/material'
import { MyAutocompleteProps } from '../../@types/input'
import CloseIcon from '@mui/icons-material/Close'

const filter = createFilterOptions()

function MyMenuPaper(props: PaperProps) {
  return (
    <Grow in={true}>
      <Paper {...props}/>
    </Grow>
  )
}

function Basic({
  variant, label, error, required, hideHelperText, onChange, multiple, 
  helperText, readOnly, items, notClearable, freeSoloItemRender, inputComponent, 
  getOptionLabel, isOptionEqualToValue, ...otherProps
}: MyAutocompleteProps) {
  return (
    <Autocomplete
      {...otherProps}
      options={readOnly ? [] : items}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params) =>
        <TextField 
          {...params}
          InputProps={{...params.InputProps, readOnly, inputComponent}}
          fullWidth
          label={label}
          variant={variant || 'standard'}
          error={error}
          required={required}
          helperText={hideHelperText ? '' : (helperText || ' ')}
        />
      }
      onChange={(event, newValue, reason, details) => onChange && onChange(newValue, {event, reason, details})}
      multiple={multiple}
      autoHighlight
      disableClearable={notClearable}
      PaperComponent={(params) => <MyMenuPaper {...params}/>}
    />
  )
}

function Solo({
  variant, label, error, required, hideHelperText, onChange, multiple, 
  helperText, readOnly, items, notClearable, freeSoloItemRender, inputComponent, 
  getOptionLabel, isOptionEqualToValue, ...otherProps
}: MyAutocompleteProps) {
  return (
    <Autocomplete
      {...otherProps}
      options={readOnly ? [] : items}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params) =>
        <TextField 
          {...params}
          InputProps={{...params.InputProps, readOnly, inputComponent}}
          fullWidth
          label={label}
          variant={variant || 'standard'}
          error={error}
          required={required}
          helperText={hideHelperText ? '' : (helperText || ' ')}
        />
      }
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        if (params.inputValue) {
          if (freeSoloItemRender) {
            filtered.push(freeSoloItemRender(params.inputValue))
          } else {
            filtered.push(params.inputValue)
          }
        }
        return filtered
      }}
      onChange={(event, newValue, reason, details) => onChange && onChange(newValue, {event, reason, details})}
      multiple={multiple}
      autoHighlight
      disableClearable={notClearable}
      PaperComponent={(params) => <MyMenuPaper {...params}/>}
      selectOnFocus
      clearOnBlur
      freeSolo
      handleHomeEndKeys
      clearIcon={<CloseIcon/>}
      componentsProps={{
        clearIndicator: {
          sx: {
            '&.MuiAutocomplete-clearIndicator': {
              visibility: 'visible',
              padding: 1
            }
          }
        }
      }}
      sx={{
        '.MuiAutocomplete-endAdornment': {
          top: multiple ? 2 : -4,
          right: -10
        },
      }}
    />
  )
}

export default function MyAutocomplete({freeSolo, ...otherProps}: MyAutocompleteProps) {
  if (freeSolo) {
    return <Solo {...otherProps}/>
  } else {
    return <Basic {...otherProps}/>
  }
}