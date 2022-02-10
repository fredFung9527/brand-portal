import { Box, IconButton, Tooltip } from '@mui/material'
import { MyIconLinkProps } from '../@types/button'
import MyLink from './MyLink'

export default function MyIconLink({title, color, to, innerRef, children}: MyIconLinkProps) {
  return (
    <MyLink to={to}>
      <Box component={title ? Tooltip : 'div'} title={title}>
        <IconButton color={color || 'inherit'} ref={innerRef}>
          { children }
        </IconButton>
      </Box>
    </MyLink>
  )
}