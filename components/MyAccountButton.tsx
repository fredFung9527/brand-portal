import { Avatar, IconButton, NoSsr } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { useRecoilValue } from 'recoil'
import { recoilUser } from '../recoil/user'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MyMenuButton from './MyMenuButton'
import { logout } from '../utils/authenticate'

function AvatarIconButton() {
  const user = useRecoilValue(recoilUser)

  return (
    <NoSsr>
      <IconButton color='inherit'>
        {Boolean(user?.avatar) ?
          <Avatar 
            src={user.avatar} 
            sx={{
              backgroundColor: 'white', 
              width: 24, height: 24
            }}
          /> :
          <AccountCircleIcon/>
        }
      </IconButton>
    </NoSsr>
  )
}

export default function MyAccountButton() {
  const { t } = useTranslation('common')

  return (
    <MyMenuButton
      title={t('pages./account')}
      button={<AvatarIconButton/>}
      items={[
        { text: t('pages./account'), to: '/account' },
        { text: t('logout'), onClick: logout },
      ]}
    />
  )
}