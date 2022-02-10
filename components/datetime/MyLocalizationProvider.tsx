import { LocalizationProvider } from '@mui/lab'
import AdapterMoment from '@mui/lab/AdapterMoment'

export default function MyLocalizationProvider({children}) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      { children }
    </LocalizationProvider>
  )
}