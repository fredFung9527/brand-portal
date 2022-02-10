import { Grid, NoSsr, Paper } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { useRecoilState } from 'recoil'
import MySwitch from '../components/MySwitch'
import { recoilDarkMode, recoilTestMode } from '../recoil/settings'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export default function Settings() {
  const { t } = useTranslation('settings')
  const [darkMode, setDarkMode] = useRecoilState(recoilDarkMode)
  const [testMode, setTestMode] = useRecoilState(recoilTestMode)

  return (
    <NoSsr>
      <Paper sx={{p: 2}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MySwitch 
              value={darkMode} 
              onChange={setDarkMode} 
              label={t('darkMode')}
              checkedIcon={<Brightness4Icon/>}
              uncheckedIcon={<Brightness7Icon/>}
            />
          </Grid>
          <Grid item xs={12}>
            <MySwitch 
              value={testMode} 
              onChange={setTestMode} 
              label={t('testMode')}
            />
          </Grid>
        </Grid>
      </Paper>
    </NoSsr>
  )
}

Settings.needLogin = true