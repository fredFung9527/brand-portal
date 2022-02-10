import LoginLayout from '../components/layout/login'
import { useCallback, useEffect, useState } from 'react'
import MyForm from '../components/form/MyForm'
import { checkRequired } from '../utils/rules'
import useTranslation from 'next-translate/useTranslation'
import { Typography, Paper, Stack, NoSsr, Zoom } from '@mui/material'
import MyCheckBox from '../components/MyCheckBox'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { recoilRememberMe } from '../recoil/user'
import { recoilAlert, recoilBeforeRouteData } from '../recoil/common'
import MyButton from '../components/MyButton'
import { login, getOneTimePassword } from '../utils/authenticate'
import { useRouter } from 'next/dist/client/router'
import MyImage from '../components/MyImage'

export function LoginComponent() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [input, setInput] = useState<any>({})
  const [isValid, setIsValid] = useState(false)
  const [rememberMe, setRememberMe] = useRecoilState(recoilRememberMe)
  const beforeRouteData = useRecoilValue(recoilBeforeRouteData)
  const setAlert = useSetRecoilState(recoilAlert)
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (beforeRouteData) {
      setAlert(`error:${t('error:loginFirst')}`)
    }
  }, [])

  const tryLogin = useCallback(async _ => {
    setShowError(true)
    if (loading || !isValid) {
      return
    }
    try {
      setLoading(true)
      await login(input)
      setAlert(t('login.welcome'))
      router.replace({
        pathname: beforeRouteData?.pathname || '/',
        query: beforeRouteData?.query || null,
      })
    } catch (e) {
      switch (e.message) {
        case 'Unauthorized User':
        case 'Invalid User':
          setAlert(`error:${t('error:wrongInfo')}`)
          break
        case 'One-time Password Expired':
          setAlert(`error:${t('error:otpExpired')}`)
          break
        default:
          setAlert(`error:${e.message}`)
      }
    } finally {
      setLoading(false)
    }
  }, [input, loading, beforeRouteData, isValid])

  const tryGetOneTimePassword = useCallback(async _ => {
    if (loading) {
      return
    }
    if (!input?.account) {
      setAlert(`error:${t('error:accountHelper')}`)
      return
    }
    try {
      setLoading(true)
      await getOneTimePassword(input.account)
      setAlert(t('login.otpHint'))
    } catch (e) {
      switch (e.message) {
        case 'Invalid Email':
          setAlert(`error:${t('error:wrongInfo')}`)
          break
        case 'Already Sent':
          setAlert(`error:${t('error:otpAlreadySent')}`)
          break
        default:
          setAlert(`error:${e.message}`)
      }
    } finally {
      setLoading(false)
    }
  }, [input, loading])

  return (
    <>
      <Typography variant='h4' sx={{fontWeight: 'bold', mb: 2}} align='center'>{t('login.login')}</Typography>
      <MyForm
        onChange={setInput}
        onValid={setIsValid}
        items={[
          {
            key: 'account',
            label: t('login.account'),
            rules: [checkRequired(t('error:required'))],
            type: 'text',
            grid: 12
          },
          {
            key: 'password',
            label: t('login.password'),
            rules: [checkRequired(t('error:required'))],
            type: 'password',
            grid: 12
          }
        ]}
        showError={showError}
      />
      <NoSsr>
        <MyCheckBox value={rememberMe} onChange={setRememberMe} label={t('login.rememberMe')}/>
      </NoSsr>
      <MyButton fullWidth onClick={tryLogin} loading={loading}>{t('login.login')}</MyButton>
      <MyButton fullWidth onClick={tryGetOneTimePassword} variant='text' sx={{mt: 2}} loading={loading}>{t('login.getOtp')}</MyButton>
    </>
  )
}

export default function Login() {
  return (
    <Stack justifyContent='center' alignItems='center' sx={{height: '100vh'}}>
      <MyImage src={'/images/duraflex.png'} width={169} height={36} priority/>
      <Zoom in={true}>
        <Paper sx={{p: 4, mt: 2, maxWidth: 'min(350px, 90%)'}}>
          <LoginComponent/>
        </Paper>
      </Zoom>
    </Stack>
  )
}

Login.Layout = LoginLayout