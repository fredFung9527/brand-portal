import { Fab, Zoom } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    function listener() {
      setShow(window.pageYOffset > 300)
    }
    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
  }, [])

  const scrollToTop = useCallback(_ => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])

  return (
    <Zoom in={show}>
      <Fab 
        aria-label='scroll to top'
        color='primary'
        onClick={scrollToTop}
        style={{position: 'fixed', bottom: '8px', right: '8px', zIndex: 99}}
      >
        <KeyboardArrowUpIcon/>
      </Fab>
    </Zoom>
  )
}