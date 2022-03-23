import { useSetRecoilState } from 'recoil'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { IconButton, Tooltip } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { recoilAlert } from '../../recoil/common'
import { filter, map, min, max, mean } from 'lodash'
import { demoPrices } from '../../demo/sales'
import { useDialog } from '../providers/DialogProvider'
import InformationTable from '../InformationTable'
import SubTitle from '../SubTitle'
import SuggestPricesDisplay from '../products/SuggestPricesDisplay'

export default function PriceRangeIcon() {
  const { t } = useTranslation('products')
  const setAlert = useSetRecoilState(recoilAlert)
  const [openDialog] = useDialog()

  function showPriceRange() {
    const prices = map(filter(demoPrices, it => it.isActive), it => it.value || null)
    if (!prices?.length) {
      setAlert(`error:${t('common:noResult')}`)
      return
    }

    openDialog({
      title: t('priceRange'),
      fullWidth: true,
      maxWidth: 'sm',
      content:
        <>
          <InformationTable
            data={[
              { key: t('min'), text: min(prices) },
              { key: t('max'), text: max(prices) },
              { key: t('mean'), text: mean(prices) }
            ]}
            component='div'
          />

          <SubTitle>{t('suggestPrices')}</SubTitle>
          <SuggestPricesDisplay component='div'/>
        </>
    })
  }

  return (
    <Tooltip title={t('priceRange')}>
      <IconButton onClick={showPriceRange}>
        <HelpOutlineIcon/>
      </IconButton>
    </Tooltip>
  )
}