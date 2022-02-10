import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { recoilDarkMode } from '../../recoil/settings'

export default function MyThemeProvider({children}) {
  const commonTheme = {
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 4
        }
      }
    }
  }
  const lightTheme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#fff',
      },
      grayBg: {
        light: '#f2f2f2',
        main: '#f2f2f2',
        dark: '#f2f2f2',
        contrastText: '#000',
      },
      grayText: {
        light: '#808080',
        main: '#808080',
        dark: '#808080',
        contrastText: '#fff',
      },
      grayLabelText: {
        light: 'rgba(0, 0, 0, 0.6)',
        main: 'rgba(0, 0, 0, 0.6)',
        dark: 'rgba(0, 0, 0, 0.6)',
        contrastText: '#fff',
      }
    },
    ...commonTheme
  })
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#fff',
      },
      grayBg: {
        light: '#121212',
        main: '#121212',
        dark: '#121212',
        contrastText: '#fff',
      },
      grayText: {
        light: '#fff',
        main: '#fff',
        dark: '#fff',
        contrastText: '#000',
      },
      grayLabelText: {
        light: 'rgba(255, 255, 255, 0.7)',
        main: 'rgba(255, 255, 255, 0.7)',
        dark: 'rgba(255, 255, 255, 0.7)',
        contrastText: '#000',
      }
    },
    ...commonTheme
  })

  const darkMode = useRecoilValue(recoilDarkMode)
  const [theme, setTheme] = useState(lightTheme)
  useEffect(() => {
    setTheme(darkMode ? darkTheme : lightTheme)
  }, [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      { children }
    </ThemeProvider>
  )
}