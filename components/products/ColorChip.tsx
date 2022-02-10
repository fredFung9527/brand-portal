import { Chip } from '@mui/material'
import { find } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useSetRecoilState } from 'recoil'
import { demoColors } from '../../demo/color'
import { recoilAlert } from '../../recoil/common'
import InformationTable from '../InformationTable'
import { useDialog } from '../providers/DialogProvider'

export default function ColorChip({label}) {
  const setAlert = useSetRecoilState(recoilAlert)
  const { t } = useTranslation('error')
  const [openDialog] = useDialog()

  function viewDetail() {
    const theItem = find(demoColors, it => it.internalColorCode === label)
    if (!theItem) {
      setAlert(`error:${t('itemNotFound')}`)
      return
    }
    openDialog({
      title: theItem.internalColorCode,
      fullWidth: true,
      maxWidth: 'sm',
      content:
        <InformationTable
          data={[
            { key: t('color:status'), text: theItem.status },
            { key: t('color:season'), text: theItem.season },
            { key: t('color:itemCode'), text: theItem.itemCode },
            { key: t('color:externalName'), text: theItem.externalName },
            { key: t('color:externalColorCode'), text: theItem.externalColorCode },
            { key: t('color:supplier'), text: theItem.supplier },
          ]}
        />          
    })
  }

  if (!label) {
    return null
  }
  return (
    <Chip label={label} color='info' onClick={viewDetail}/>
  )
}