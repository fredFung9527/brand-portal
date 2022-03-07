import { Drawer, IconButton, ListItem, List, ListItemIcon, ListItemText, Grid, Typography, Divider, Collapse } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useCallback, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import HomeIcon from '@mui/icons-material/Home'
import { map, filter, some } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { recoilUser } from '../recoil/user'
import MyLink from './MyLink'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useRouter } from 'next/router'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { getUserShowName } from '../utils/common'
import SettingsIcon from '@mui/icons-material/Settings'
import CategoryIcon from '@mui/icons-material/Category'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { recoilMenu } from '../recoil/common'

function MyListItem({icon, text, to, onClick}) {
  const router = useRouter()

  return (
    <MyLink to={to}>
      <ListItem 
        button 
        onClick={onClick}
        selected={router.pathname === to}
      >
        <ListItemIcon>{ icon }</ListItemIcon>
        <ListItemText>{ text }</ListItemText>
      </ListItem>
    </MyLink>
  )
}

function MyListItemGroup({icon, text, subPages, closeMenu}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (some(subPages, page => page.to === router.pathname)) {
      setOpen(true)
    }
  }, [router.pathname])

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>{ icon }</ListItemIcon>
        <ListItemText>{ text }</ListItemText>
        {open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
      </ListItem>

      <Collapse in={open}>
        <Divider/>
        <List sx={{p: 0}}>
          {map(subPages, (subPage, idx) => 
            <MyListItem key={idx} {...subPage} onClick={closeMenu}/>
          )}
        </List>
        <Divider/>
      </Collapse>
    </>
  )
}

export default function MyDrawerMenu() {
  const { t } = useTranslation('common')
  const [open, setOpen] = useRecoilState(recoilMenu)
  const [filteredPages, setFilteredPages] = useState([])
  const user = useRecoilValue(recoilUser)

  const allPages = [
    {
      text: t('pages./'),
      icon: <HomeIcon/>,
      to: '/'
    },
    {
      text: t('pages./sales'),
      icon: <AttachMoneyIcon/>,
      subPages: [
        {
          text: t('search'),
          icon: <SearchIcon/>,
          to: '/sales'
        },
        {
          text: t('create'),
          icon: <AddIcon/>,
          to: '/sales/new'
        }
      ]
    },
    {
      text: t('pages./products'),
      icon: <CategoryIcon/>,
      subPages: [
        {
          text: t('search'),
          icon: <SearchIcon/>,
          to: '/products'
        },
        {
          text: t('create') + ' (Custom)',
          icon: <AddIcon/>,
          to: '/products/new/custom'
        },
        {
          text: t('create') + ' (General)',
          icon: <AddIcon/>,
          to: '/products/new/general'
        }
      ]
    },
    {
      text: t('pages./account'),
      icon: <AccountCircleIcon/>,
      to: '/account'
    },
    {
      text: t('pages./settings'),
      icon: <SettingsIcon/>,
      to: '/settings'
    },
  ]
  useEffect(() => {
    function checkIfCanAccess(page) {
      if (page.roles) {
        return false
      } else {
        return true
      }
    }
    setFilteredPages(filter(allPages, page => checkIfCanAccess(page)))
  }, [user])

  const closeMenu = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <IconButton color='inherit' onClick={() => setOpen(true)}>
        <MenuIcon/>
      </IconButton>

      <Drawer open={open} onClose={closeMenu}>
        <Grid container alignItems='center' sx={{my: 1.5}}>
          <Grid 
            item xs 
            sx={(theme) => ({
              backgroundColor: theme.palette.grayBg.main, 
              py: 1.5, px: 1, 
              borderRadius: theme.spacing(0, 1, 1, 0),
            })}
          >
            <Typography fontWeight='bold'>{getUserShowName(user)}</Typography>
          </Grid>
          <Grid item sx={{mx: 1}}>
            <IconButton onClick={closeMenu}>
              <ChevronLeftIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <Divider/>

        <List sx={{width: 250, pt: 0}}>
          {map(filteredPages, (page, idx) =>
            (Boolean(page.subPages?.length) ? 
              <MyListItemGroup key={idx} {...page} closeMenu={closeMenu}/> :
              <MyListItem key={idx} {...page} onClick={closeMenu}/>
            )
          )}
        </List>
      </Drawer>
    </>
  )
}