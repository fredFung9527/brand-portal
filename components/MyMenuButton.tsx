import { Tooltip, Box, Menu, MenuItem } from '@mui/material'
import { useCallback, useState } from 'react'
import { MyMouseEvent } from '../@types/input'
import { map } from 'lodash'
import { MyMenuButtonItem, MyMenuButtonProps } from '../@types/button'
import { useRouter } from 'next/router'

export default function MyMenuButton({title, button, items, right=15, ...otherProps}: MyMenuButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null)
  const router = useRouter()

  const openMenu = useCallback((event: MyMouseEvent) => {
    setAnchorEl(event.currentTarget)
  }, [])
  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])
  
  return (
    <>
      <Box component={Boolean(title) ? Tooltip : 'div'} title={title}>
        <div onClick={openMenu}>
          { button }
        </div>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        onClick={closeMenu}
        PaperProps={{
          sx: {
            overflow: 'visible',
            mt: 1,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: right,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        {...otherProps}
      >
        {map(items, (item: MyMenuButtonItem, idx) => 
          <MenuItem 
            key={idx} 
            onClick={(e: any) => item.onClick ? item.onClick(e) : router.push(item.to)}
          >
            { item.component || item.text }
          </MenuItem>
        )}
      </Menu>
    </>
  )
}