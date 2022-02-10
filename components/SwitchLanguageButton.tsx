import TranslateIcon from '@mui/icons-material/Translate'
import { IconButton, Tooltip } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { indexOf } from 'lodash'

export default function SwitchLanguageButton() {
  const { t } = useTranslation('common')
  const router = useRouter()

  function switchLanguage() {
    if (!process.env.finishI18n) {
      return
    }
    const { pathname, asPath, query, locale, locales } = router
    const currentIdx = indexOf(locales, locale)
    const next = locales[(currentIdx + 1) % (locales.length)]
    router.push({ pathname, query }, asPath, { locale: next })
  }

  return (
    <Tooltip title={t('button.switchLang')} onClick={switchLanguage}>
      <IconButton color='inherit'>
        <TranslateIcon/>
      </IconButton>
    </Tooltip>
  )
}