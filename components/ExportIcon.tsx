import { IconButton, Tooltip } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import useTranslation from 'next-translate/useTranslation'

export default function ExportIcon({onClick}) {
  const { t } = useTranslation('common')

  return (
    <Tooltip title={t('export')}>
      <IconButton color='primary' onClick={onClick}>
        <FileDownloadIcon/>
      </IconButton>
    </Tooltip>
  )
}