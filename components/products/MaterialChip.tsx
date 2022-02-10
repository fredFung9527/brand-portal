import { Chip, Typography } from '@mui/material'
import { find } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useSetRecoilState } from 'recoil'
import { demoMaterials } from '../../demo/material'
import { recoilAlert } from '../../recoil/common'
import MyRadarChart from '../charts/MyRadarChart'
import { useDialog } from '../providers/DialogProvider'

export default function MaterialChip({label}) {
  const setAlert = useSetRecoilState(recoilAlert)
  const { t } = useTranslation('error')
  const [openDialog] = useDialog()

  function viewDetail() {
    const theItem = find(demoMaterials, it => it.name === label)
    if (!theItem) {
      setAlert(`error:${t('itemNotFound')}`)
      return
    }
    openDialog({
      title: theItem.name,
      content:
        <>
          <Typography 
            sx={(theme) => 
              ({
                color: theme.palette.grayText.main
              })
            }
          >
            { theItem.description }
          </Typography>
          <MyRadarChart
            data={theItem.properties}
            max={10}
            xKey='name'
            yKey='value'
            height={300}
          />
        </>
    })
  }

  if (!label) {
    return null
  }
  return (
    <Chip label={label} variant='outlined' onClick={viewDetail}/>
  )
}