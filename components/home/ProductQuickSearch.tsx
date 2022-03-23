import SearchIcon from '@mui/icons-material/Search'
import DirectionsIcon from '@mui/icons-material/Directions'
import { Box, Divider, InputBase, Menu, MenuItem, Paper } from '@mui/material'
import MyIconLink from '../MyIconLink'
import { useEffect, useRef, useState } from 'react'
import { demoProductBasics } from '../../demo/product'
import { map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

function InputPart({name, setName, axCode, setAxcode, id, setId, focus=null, setFocus=null}) {
  const { t } = useTranslation('products')

  const nameRef = useRef(null)
  const axCodeRef = useRef(null)
  const idRef = useRef(null)
  
  useEffect(() => {
    if (focus === 'name') {
      nameRef?.current?.focus()
    } else if (focus === 'axCode') {
      axCodeRef?.current?.focus()
    } else if (focus === 'id') {
      idRef?.current?.focus()
    } 
  }, [focus])
  
  return (
    <Box sx={{p: 0.5, display: 'flex', alignItems: 'center'}}>
      <SearchIcon sx={{ml: 1}} color='action'/>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t('name')}
        value={name}
        onChange={(event) => setName(event.target.value)}
        inputRef={nameRef}
        onFocus={() => setFocus && setFocus('name')}
        autoComplete='new-password'
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t('axCode')}
        value={axCode}
        onChange={(event) => setAxcode(event.target.value)}
        inputRef={axCodeRef}
        onFocus={() => setFocus && setFocus('axCode')}
        autoComplete='new-password'
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <InputBase
        sx={{ ml: 1, flex: 0.5 }}
        placeholder='ID'
        value={id}
        onChange={(event) => setId(event.target.value)}
        inputRef={idRef}
        onFocus={() => setFocus && setFocus('id')}
        autoComplete='new-password'
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <MyIconLink to='/products' color='primary'>
        <DirectionsIcon/>
      </MyIconLink>
    </Box>
  )
}

export default function ProductQuickSearch() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const [options, setOptions] = useState([])
  const [focus, setFocus] = useState('')
  const [name, setName] = useState('')
  const [axCode, setAxcode] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    if (name || axCode || id) {
      setOptions(demoProductBasics)
    } else {
      setOptions([])
    }
  }, [name, axCode, id])

  function openMenu(event) {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }
  function closeMenu() {
    setAnchorEl(null)
    setOpen(false)
    setFocus('')
  }

  return (
    <>
      <Paper 
        onClick={openMenu} 
        elevation={open ? 0 : 4}
      >
        <InputPart
          name={name} setName={setName} axCode={axCode}
          setAxcode={setAxcode} id={id} setId={setId}
          setFocus={setFocus}
        />
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          sx: { 
            width: anchorEl?.offsetWidth,
            p: 0
          }
        }}
        PaperProps={{
          elevation: 4
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transitionDuration={0}
      >
        <InputPart
          name={name} setName={setName} axCode={axCode}
          setAxcode={setAxcode} id={id} setId={setId}
          focus={focus}
        />
        {Boolean(options?.length) && <Divider variant='middle'/>}
        {map(options, option =>
          <MenuItem key={option.id} onClick={() => router.push(`/products/${option.id}`)}>
            {option.name}
          </MenuItem>
        )}
      </Menu>
    </>
  )
}