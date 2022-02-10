import LoadingButton from '@mui/lab/LoadingButton'
import Link from 'next/link'
import { MyButtonProps } from '../@types/button'

export default function MyButton({to, variant, color, loading, children, ...otherProps}: MyButtonProps) {
  const theButton = 
    <LoadingButton 
      variant={variant || 'contained'} 
      color={color || 'primary'} 
      loading={loading}
      {...otherProps}
    >
      {children}
    </LoadingButton>

  if (!to) {
    return theButton
  }
  return (
    <Link href={to}>
      <a>
        {theButton}
      </a>
    </Link>
  )
}