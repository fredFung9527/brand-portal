import { Avatar, Grid, IconButton, NoSsr, Paper } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import MyFilePicker from '../components/MyFilePicker'
import { recoilAlert, recoilLoading } from '../recoil/common'
import { recoilUser } from '../recoil/user'
import { changePassword, updateAvatar } from '../utils/authenticate'
import MyForm from '../components/form/MyForm'
import { checkRequired, comparePassword } from '../utils/rules'
import MyButton from '../components/MyButton'

function UserAvatar() {
  const user = useRecoilValue(recoilUser)
  const [loading, setLoading] = useRecoilState(recoilLoading)
  const setAlert = useSetRecoilState(recoilAlert)
  async function handleInput(v) {
    if (!v || loading) {
      return
    }
    try {
      setLoading(true)
      await updateAvatar(v)
    } catch (e) {
      setAlert(`error:${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <NoSsr>
      <IconButton>
        <MyFilePicker onChange={handleInput}>
          <Avatar
            src={user?.avatar} 
            sx={(theme) => ({
              backgroundColor: Boolean(user?.avatar) ? 'white' : theme.palette.primary.main, 
              width: 150, height: 150, fontSize: 60, border: '1px solid gray'
            })}
          >
            {user?.firstName && user?.firstName[0]}
          </Avatar>
        </MyFilePicker>
      </IconButton>
    </NoSsr>
  )
}

function ChangePassword() {
  const { t } = useTranslation('common')
  const setAlert = useSetRecoilState(recoilAlert)
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [input, setInput] = useState<any>({})
  const [isValid, setIsValid] = useState(false)

  async function confirmNewPassword() {
    setShowError(true)
    if (!isValid || loading) {
      return
    }
    try {
      setLoading(true)
      await changePassword(input.password)
    } catch (e) {
      setAlert(`error:${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <MyForm
        onChange={setInput}
        onValid={setIsValid}
        items={[
          {
            key: 'password',
            label: t('login.newPwd'),
            rules: [checkRequired(t('error:required'))],
            type: 'password',
            grid: 12
          },
          {
            key: 'cPassword',
            label: t('login.confirmPwd'),
            rules: [comparePassword(t('login.InconsistentPwd'))],
            type: 'password',
            grid: 12
          }
        ]}
        showError={showError}
      />
      
      <Grid container justifyContent='flex-end'>
        <MyButton onClick={confirmNewPassword} loading={loading}>{t('confirm')}</MyButton>
      </Grid>
    </>
  )
}

export default function Account() {
  return (
    <Paper sx={{p: 2}}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} md={3} container justifyContent='center'>
          <UserAvatar/>
        </Grid>
        <Grid item xs={12} md={9}>
          <ChangePassword/>
        </Grid>
      </Grid>
    </Paper>
  )
}

Account.needLogin = true