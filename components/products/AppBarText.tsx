import { Box } from '@mui/material'

export default function AppBarText({text, innerRef}) {
  return (
    <Box
      sx={{
        textDecoration: 'underline', 
        cursor: 'pointer'
      }}
      onClick={() => innerRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
    >
      { text }
    </Box>
  )
}