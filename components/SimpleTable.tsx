import { Table, Paper, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material'
import { map } from 'lodash'

export default function SimpleTable({headers, data, headerColor='primary', component=null, ...otherProps}) {
  return (
    <TableContainer component={component || Paper} {...otherProps}>
      <Table>
        <TableHead>
          <TableRow>
            {map(headers, (header, idx) =>
              <TableCell 
                key={idx}
                sx={(theme) => ({
                  backgroundColor: theme.palette[headerColor]?.main || theme.palette.primary.main,
                  color: 'white'
                })}
                align='center'
              >
                {header.text || header}
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {map(data, (list, idx) => 
            <TableRow key={idx}>
              {map(list, (value, jdx) =>
                <TableCell 
                  key={jdx} 
                  width={headers[idx]?.width} 
                  colSpan={list.length === 1 ? headers.length : 1}
                  align='center'
                >
                  {value}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}