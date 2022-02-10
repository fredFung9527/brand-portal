import { Paper, InputBase, Divider, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { recoilMenu } from '../../recoil/common'
import useTranslation from 'next-translate/useTranslation'
import MyIconLink from '../MyIconLink'

export default function Search() {
  const { t } = useTranslation('common')
  const [keyword, setKeyword] = useState('')
  const setMenu = useSetRecoilState(recoilMenu)
  const ref = useRef(null)

  return (
    <Paper sx={{ p: 1, display: 'flex', alignItems: 'center', width: 400 }}>
      <IconButton aria-label='menu' onClick={() => setMenu(true)}>
        <MenuIcon/>
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t('searchProducts')}
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter' ? ref && ref.current.click() : null}
      />
      <MyIconLink innerRef={ref} to={`/products${keyword ? `?keyword=${keyword}` : ''}`}>
        <SearchIcon/>
      </MyIconLink>
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical'/>
      <MyIconLink color='primary' to='/products/new'>
        <AddIcon/>
      </MyIconLink>
    </Paper>
  )
}