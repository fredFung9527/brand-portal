import { Table, Paper, TableBody, TableCell, TableContainer, TableRow, Divider } from '@mui/material'
import { map } from 'lodash'

export default function InformationTable({data, ...otherProps}) {
  return (
    <TableContainer component={Paper} {...otherProps}>
      <Table>
        <TableBody>
          {map(data, (row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                component='th' scope='row' 
                width={'25%'} align='center'
                sx={(theme) => ({
                  background: theme.palette.grayBg.main,
                })}
              >
                {row.key}
              </TableCell>
              <TableCell>
                {row.text}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}