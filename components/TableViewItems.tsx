import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { cloneElement, useEffect } from 'react'
import { TableViewItemsProps } from '../@types/view'

export default function TableViewItems({headers, page, pageSize, total, items, keyKey, init, renderItem, onPage, onPageSize }: TableViewItemsProps) {
  const { t } = useTranslation('common')
  
  useEffect(() => {
    init && init()
  }, [])

  return (
    <Paper sx={{ width: '100%', overflow: 'auto', mt: 2 }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {map(headers, header =>
                <TableCell key={header}>{header}</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {map(items, (it, idx) => 
              cloneElement(renderItem(it), {key: it[keyKey || 'id'] || idx})
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component='div'
        rowsPerPageOptions={[10, 20, 50, 100]}
        count={total}
        rowsPerPage={pageSize}
        page={page - 1}
        onPageChange={(_, v) => onPage && onPage(v)}
        onRowsPerPageChange={(event) => onPageSize && onPageSize(+event.target.value)}
        labelRowsPerPage={`${t('table.rowsPerpage')}: `}
      />
    </Paper>
  )
}