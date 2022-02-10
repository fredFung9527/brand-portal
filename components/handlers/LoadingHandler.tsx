import { Backdrop, CircularProgress } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { recoilLoading } from '../../recoil/common'

export default function LoadingHandler() {
  const loading = useRecoilValue(recoilLoading)
  return (
    <Backdrop
      open={loading} 
      transitionDuration={{exit: 800}}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color='primary'/>
    </Backdrop>
  )
}