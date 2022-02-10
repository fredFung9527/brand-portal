import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { MyTextFieldProps } from '../../@types/input'
import MyTextField from '../form/MyTextField'

export default function ProductPullTestInput({value, onChange, ...otherProps}: MyTextFieldProps) {
  const [lbs, setLbs] = useState('')
  const ratio = 2.20462262

  function handleLbsInput(v) {
    onChange && onChange(v ? String(Math.round(v / ratio)): '')
    setLbs(v)
  }
  function handInput(v) {
    setLbs(v ? String(Math.round(v * ratio)) : '')
    onChange && onChange(v)
  }
  
  return (
    <Grid container columns={15} alignItems='flex-end'>
      <Grid item xs={7}>
        <MyTextField 
          {...otherProps}
          value={value}
          onChange={handInput}
          type='number' 
          actions={<span>kg</span>}
          notClearable
        />
      </Grid>
      <Grid item xs={1}>
        <Typography 
          align='center'
          sx={(theme) => ({
            color: theme.palette.grayText.main,
            mb: '24px'
          })}
        >
          =
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <MyTextField 
          {...otherProps}
          label=''
          required={false}
          error={false}
          helperText=''
          value={lbs}
          onChange={handleLbsInput}
          type='number' 
          actions={<span>lbs</span>}
        />
      </Grid>
    </Grid>
  )
}