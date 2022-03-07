import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material'
import { map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { cloneElement, useEffect } from 'react'
import { TableViewItemsProps } from '../@types/view'
import MyLink from './MyLink'
import EditIcon from '@mui/icons-material/Edit'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import DeleteButton from './DeleteButton'

export function TableActions({onRemove, detailPath, editPath, clonePath}) {
  const { t } = useTranslation('common')
  return (
    <>
      <MyLink to={detailPath}>
        <Tooltip title={t('open')}>
          <IconButton color='success'>
            <FileOpenIcon/>
          </IconButton>
        </Tooltip>
      </MyLink>
      <MyLink to={editPath}>
        <Tooltip title={t('edit')}>
          <IconButton color='primary'>
            <EditIcon/>
          </IconButton>
        </Tooltip>
      </MyLink>
      <MyLink to={clonePath}>
        <Tooltip title={t('clone')}>
          <IconButton color='info'>
            <FileCopyIcon/>
          </IconButton>
        </Tooltip>
      </MyLink>
      <DeleteButton onRemove={onRemove}/>
    </>
  )
}

export function MyTableCell({width=150, children}) {
  return (
    <TableCell style={{ minWidth: width }}>
      { children }
    </TableCell>
  )
}

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