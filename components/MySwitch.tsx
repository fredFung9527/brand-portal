import { Grid, Typography } from '@mui/material'
import { cloneElement } from 'react'
import Switch from 'react-switch'

function IconBox({children}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'white',
      }}
    >
      { cloneElement(children, { fontSize: 'small' }) }
    </div>
  )
}

export default function MySwitch({value, onChange, label, ...otherProps}) {
  return (
    <Grid container alignItems='center' columnSpacing={1}>
      <Grid item>
        <Grid container alignItems='center'>
          <Switch
            checked={value} 
            onChange={onChange} 
            checkedIcon={otherProps?.checkedIcon ? <IconBox>{otherProps.checkedIcon}</IconBox> : undefined}
            uncheckedIcon={otherProps?.uncheckedIcon ? <IconBox>{otherProps.uncheckedIcon}</IconBox> : undefined}
            activeBoxShadow=''
            height={24}
            width={48}
          />
        </Grid>
      </Grid>
      {Boolean(label) && 
        <Grid item>
          <Typography>{ label }</Typography>
        </Grid>
      }
    </Grid>
  )
}