import SearchIcon from '@mui/icons-material/Search'
import DirectionsIcon from '@mui/icons-material/Directions'
import { Box, Divider, InputBase, Menu, MenuItem, Paper } from '@mui/material'
import MyIconLink from '../MyIconLink'
import { useEffect, useRef, useState } from 'react'
import { map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { demoOnSales } from '../../demo/sales'
import { useRouter } from 'next/router'

function InputPart({axCode, setAxcode, marketCode, setMarketCode, brandRefCode, setBrandRefCode, focus=null, setFocus=null}) {
  const { t } = useTranslation('products')

  const axCodeRef = useRef(null)
  const marketCodeRef = useRef(null)
  const brandRefCodeRef = useRef(null)
  
  useEffect(() => {
    if (focus === 'axCode') {
      axCodeRef?.current?.focus()
    } else if (focus === 'marketCode') {
      marketCodeRef?.current?.focus()
    } else if (focus === 'brandRefCode') {
      brandRefCodeRef?.current?.focus()
    } 
  }, [focus])
  
  return (
    <Box sx={{p: 0.5, display: 'flex', alignItems: 'center'}}>
      <SearchIcon sx={{ml: 1}} color='action'/>
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
        sx={{ ml: 1, flex: 1 }}
        placeholder={t('marketCode')}
        value={marketCode}
        onChange={(event) => setMarketCode(event.target.value)}
        inputRef={marketCodeRef}
        onFocus={() => setFocus && setFocus('marketCode')}
        autoComplete='new-password'
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t('brandRefCode')}
        value={brandRefCode}
        onChange={(event) => setBrandRefCode(event.target.value)}
        inputRef={brandRefCodeRef}
        onFocus={() => setFocus && setFocus('brandRefCode')}
        autoComplete='new-password'
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <MyIconLink to='/products' color='primary'>
        <DirectionsIcon/>
      </MyIconLink>
    </Box>
  )
}

export default function SalesQuickSearch() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const [options, setOptions] = useState([])
  const [focus, setFocus] = useState('')
  const [axCode, setAxcode] = useState('')
  const [marketCode, setMarketCode] = useState('')
  const [brandRefCode, setBrandRefCode] = useState('')

  useEffect(() => {
    if (axCode || marketCode || brandRefCode) {
      setOptions(demoOnSales)
    } else {
      setOptions([])
    }
  }, [axCode, marketCode, brandRefCode])

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
          axCode={axCode} setAxcode={setAxcode} marketCode={marketCode}
          setMarketCode={setMarketCode} brandRefCode={brandRefCode}
          setBrandRefCode={setBrandRefCode} setFocus={setFocus}
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
          axCode={axCode} setAxcode={setAxcode} marketCode={marketCode}
          setMarketCode={setMarketCode} brandRefCode={brandRefCode}
          setBrandRefCode={setBrandRefCode}
          focus={focus}
        />
        {Boolean(options?.length) && <Divider variant='middle'/>}
        {map(options, option =>
          <MenuItem key={option.id} onClick={() => router.push(`/sales/${option.id}`)}>
            {option.marketCode} / {option.brandRefCode}
          </MenuItem>
        )}
      </Menu>
    </>
  )
}