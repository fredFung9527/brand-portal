import { Table, Paper, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { map } from 'lodash'

export default function InformationTable({data, component=null, ...otherProps}) {
  return (
    <TableContainer component={component || Paper} {...otherProps}>
      <Table>
        <TableBody>
          {map(data, (row, idx) => (
            <TableRow key={idx}>
              <TableCell 
                component='th' scope='row' 
                width={'25%'} align='center'
                sx={(theme) => ({
                  background: theme.palette.grayBg.main,
                })}
              >
                {row.key}
              </TableCell>
              <TableCell sx={{whiteSpace: 'pre-wrap'}}>
                {row.text}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}