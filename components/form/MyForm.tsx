import { Grid } from '@mui/material'
import { debounce, filter, forEach, isEmpty, map, some } from 'lodash'
import { cloneElement, useCallback, useEffect, useRef, useState } from 'react'
import { MyFormItem, MyFormProps } from '../../@types/input'
import { list2Object } from '../../utils/common'
import MyDatePicker from '../datetime/MyDatePicker'
import MySelect from '../select/MySelect'
import MyPasswordField from './MyPasswordField'
import MyTextField from './MyTextField'

export default function MyForm({items, onChange, onValid, showError, sx, columnSpacing, updateHelper, parseNewValue}: MyFormProps) {
  const [input, setInput] = useState(list2Object(items, 'key', 'default'))
  const [helperTexts, setHelperTexts] = useState({})

  const debounceCall = useRef(
    debounce((f) => f(), 500)
  ).current
  useEffect(() => {
    debounceCall(() => {
      let newHelperTexts = {}
      forEach(items, it => {
        const isHidden = it.hidden && it.hidden(input)
        if (!isHidden && it.rules?.length) {
          for (const rule of it.rules) {
            const result = rule(input[it.key], input)
            if (result) {
              newHelperTexts[it.key] = result
              break
            }
          }
        }
      })

      onChange && onChange(input)
      onValid && onValid(!some(newHelperTexts, (value, key) => Boolean(value)))
      setHelperTexts(newHelperTexts)
    })
  }, [input, updateHelper])

  const handleInput = useCallback((v, key) => {
    const newValue = {...input, [key]: v}
    if (parseNewValue) {
      setInput(parseNewValue(input, newValue))
    } else {
      setInput(newValue)
    }
  }, [input])

  function getFieldComponent({label, key, rules, component, type, items, otherProps}: MyFormItem) {
    const params = {
      label,
      value: input[key] === null ? null : (input[key] || ''),
      onChange: v => handleInput(v, key),
      error: showError && Boolean(helperTexts[key]),
      helperText: showError && helperTexts[key],
      required: Boolean(rules?.length),
      ...otherProps
    }
    if (component) {
      return cloneElement(component, params)
    }
    switch (type) {
      case 'text':
        return <MyTextField {...params}/>
      case 'textArea':
        return <MyTextField {...params} multiline/>
      case 'number':
        return <MyTextField {...params} type='number'/>
      case 'password':
        return <MyPasswordField {...params}/>
      case 'date':
        return <MyDatePicker {...params}/>
      case 'select':
        return <MySelect {...params} items={items}/>
      default:
        return null
    }
  } 

  if (isEmpty(input)) {
    return null
  }
  return (
    <Grid container sx={sx} columnSpacing={columnSpacing === 0 ? 0 : (columnSpacing || 2)} alignItems='flex-end'>
      {map(filter(items, item => item.hidden ? !item.hidden(input) : true), it => 
        <Grid 
          item 
          key={it.key} 
          xs={it.grid ? (typeof it.grid === 'number' ? it.grid : it.grid.xs) : 'auto'} 
          sm={it.grid ? (typeof it.grid === 'number' ? it.grid : (it.grid.sm || it.grid.xs)) : 'auto'} 
          md={it.grid ? (typeof it.grid === 'number' ? it.grid : (it.grid.md || it.grid.sm || it.grid.xs)) : 'auto'} 
          lg={it.grid ? (typeof it.grid === 'number' ? it.grid : (it.grid.lg || it.grid.md || it.grid.sm || it.grid.xs)) : 'auto'}
        >
          {getFieldComponent(it)}
        </Grid>
      )}
    </Grid>
  )
}