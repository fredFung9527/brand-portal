import { useRecoilValue, useSetRecoilState } from 'recoil'
import { recoilTargetPCC } from '../../recoil/sales'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { IconButton, Tooltip } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { recoilAlert } from '../../recoil/common'
import { filter, map, min, max, sum, mean } from 'lodash'
import { demoPCCPrices } from '../../demo/sales'
import { useDialog } from '../providers/DialogProvider'
import InformationTable from '../InformationTable'

export default function PriceRangeIcon() {
  const { t } = useTranslation('products')
  const pcc = useRecoilValue(recoilTargetPCC)
  const setAlert = useSetRecoilState(recoilAlert)
  const [openDialog] = useDialog()

  function showPriceRange() {
    if (!pcc?.id) {
      setAlert(`error:${t('needPCC')}`)
      return
    }
    const prices = map(filter(demoPCCPrices, it => it.isActive && it.pccId === pcc.id), it => it.value || null)
    if (!prices?.length) {
      setAlert(`error:${t('common:noResult')}`)
      return
    }

    openDialog({
      title: t('priceRange'),
      fullWidth: true,
      maxWidth: 'xs',
      content: 
        <InformationTable
          data={[
            { key: t('min'), text: min(prices) },
            { key: t('max'), text: max(prices) },
            { key: t('mean'), text: mean(prices) }
          ]}
        />
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