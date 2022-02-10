import { Grid } from '@mui/material'
import { map } from 'lodash'
import { useEffect } from 'react'
import { GridViewItemsProps } from '../@types/view'
import MyPagination from './MyPagination'
import NoResultHint from './NoResultHint'

export default function GridViewItems({page, totalPage, items, keyKey, init, renderItem, onPage, xs, sm, md, lg}: GridViewItemsProps) {
  useEffect(() => {
    init && init()
  }, [])

  if (!items?.length) {
    return (
      <NoResultHint/>
    )
  }

  return (
    <>
      <Grid container spacing={2} sx={{mt: 1, mb: 2}}>
        {map(items, (it, idx) => 
          <Grid item xs={xs} sm={sm} md={md} lg={lg} key={it[keyKey || 'id'] || idx}>
            { renderItem(it) }
          </Grid>
        )}
      </Grid>

      <MyPagination total={totalPage} value={page} onChange={(v) => onPage && onPage(v)}/>
    </>
  )
}