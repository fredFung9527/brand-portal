import { Grid } from '@mui/material'
import { map } from 'lodash'
import { useEffect } from 'react'
import { GridViewItemsProps } from '../@types/view'
import NoResultHint from './NoResultHint'

export default function GridViewItems({items, keyKey, init, renderItem, xs, sm, md, lg}: GridViewItemsProps) {
  useEffect(() => {
    init && init()
  }, [])

  if (!items?.length) {
    return (
      <NoResultHint/>
    )
  }

  return (
    <Grid container spacing={2} sx={{mt: 1, mb: 2}}>
      {map(items, (it, idx) => 
        <Grid item xs={xs} sm={sm} md={md} lg={lg} key={it[keyKey || 'id'] || idx}>
          { renderItem(it) }
        </Grid>
      )}
    </Grid>
  )
}