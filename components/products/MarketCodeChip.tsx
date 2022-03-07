import { Chip } from '@mui/material'
import { find } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useSetRecoilState } from 'recoil'
import { demoMarketCodes } from '../../demo/brand'
import { recoilAlert } from '../../recoil/common'
import InformationTable from '../InformationTable'
import { useDialog } from '../providers/DialogProvider'

export default function MarketCodeChip({label}) {
  const setAlert = useSetRecoilState(recoilAlert)
  const { t } = useTranslation('error')
  const [openDialog] = useDialog()

  function viewDetail() {
    const theItem = find(demoMarketCodes, it => it.marketCode === label)
    if (!theItem) {
      setAlert(`error:${t('itemNotFound')}`)
      return
    }
    openDialog({
      title: theItem.marketCode,
      fullWidth: true,
      maxWidth: 'sm',
      content:
        <InformationTable
          data={[
            { key: t('market-code:name'), text: theItem.name },
            { key: t('market-code:industry'), text: theItem.industry },
            { key: t('market-code:manager'), text: theItem.manager },
            { key: t('market-code:assistant'), text: theItem.assistant },
            { key: t('market-code:advisor'), text: theItem.advisor },
            { key: t('market-code:developer'), text: theItem.developer },
          ]}
        />
    })
  }


  if (!label) {
    return null
  }
  return (
    <Chip label={label} color='primary' onClick={viewDetail}/>
  )
}