import { Grid } from '@mui/material'
import MyToggle from '../MyToggle'
import ProductStatus from './ProductStatus'

export default function ProductStatusPicker({label, value, onChange, multiple=false}) {
  return (
    <Grid container alignItems='center' columnSpacing={2}>
      <Grid item>
        { label }
      </Grid>
      <Grid item>
        <MyToggle
          value={value}
          onChange={onChange}
          multiple={multiple}
          items={[
            { value: 'Completed', text: <ProductStatus status='Completed'/> },
            { value: 'In Progress', text: <ProductStatus status='In Progress'/> },
            { value: 'Testing', text: <ProductStatus status='Testing'/> }
          ]}
        />
      </Grid>
    </Grid>
  )
}