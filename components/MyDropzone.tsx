import { Box, Button, Grid, Typography } from '@mui/material'
import { map, slice } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import Dropzone from 'react-dropzone'
import { useSetRecoilState } from 'recoil'
import { MyFilePickerProps } from '../@types/input'
import { recoilAlert } from '../recoil/common'
import MyImage from './MyImage'
import { useDialog } from './providers/DialogProvider'
import InformationTable from './InformationTable'
import MyButton from './MyButton'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteButton from './DeleteButton'

function getFileSize(v) {
  return v && `${Math.round(v / 1024)} KB` || ''
}

function FileGridCard({file, onRemove, disabled=false}) {
  const { t } = useTranslation('common')
  const [openDialog] = useDialog()

  function viewDetail() {
    openDialog({
      title: file.name,
      fullWidth: true,
      maxWidth: 'xs',
      content:
        <InformationTable
          data={[
            { key: t('dropzone.type'), text: file.fileType },
            { key: t('dropzone.size'), text: getFileSize(file.fileSize) },
          ]}
          component='div'
        />,
      actions:
        <Box sx={{mt: -1}}>
          <DeleteButton textMode onRemove={onRemove} disabled={disabled}/>
          <a href={typeof file.src === 'string' ? file.src : URL.createObjectURL(file.src)} target='_blank' rel='noreferrer'>
            <MyButton 
              color='primary'
              startIcon={<DownloadIcon/>}
              sx={{ml: 1}}
            >
              {t('dropzone.download')}
            </MyButton>
          </a>
        </Box>
    })
  }

  return (
    <Button onClick={viewDetail}>
      {file.fileType === '3dPhoto' ?
        <MyImage src='/images/3d.png' width={150} height={150}/> :
        file.fileType.startsWith('image') ?
          <MyImage src={file.src} width={150} height={150}/> :
          <MyImage src='/images/file.png' width={150} height={150}/>
      }
    </Button>
  )
}

function FileListItem({file, onRemove, disabled=false, idx}) {
  return (
    <Grid container alignItems='center'>
      <Grid item xs>
        <a href={typeof file.src === 'string' ? file.src : URL.createObjectURL(file.src)} target='_blank' rel='noreferrer'>
          <Typography 
            sx={(theme) => 
              ({
                textDecoration: 'underline',
                color: theme.palette.primary.main,
                cursor: 'pointer'
              })
            }
          >
            {idx + 1}. {file.name} / {getFileSize(file.fileSize)}
          </Typography>
        </a>
      </Grid>
      <Grid item>
        <DeleteButton onRemove={onRemove} disabled={disabled}/>
      </Grid>
    </Grid>
  )
}

export default function MyDropzone({
  label, value, onChange, sizeLimit, accept, disabled, listView
}: MyFilePickerProps & { listView?: boolean }) {
  const { t } = useTranslation('common')
  const setAlert = useSetRecoilState(recoilAlert)
  
  function onDrop(files) {
    if (!files?.length) {
      return
    }
    let list = []
    for (let idx = 0; idx < files.length; idx++) {
      const file = files[idx]
      if (file.name.endsWith('exe')) {
        setAlert(`error:${t('invalidFile')}`)
        return
      }
      if (file.size > (sizeLimit || 10 * 1024 * 1024)) {
        setAlert(`error:${t('fileTooLarge')}`)
        return
      }
      list.push({
        name: file.name,
        fileSize: file.size,
        fileType: file.type || (file.name.endsWith('gltf') || file.name.endsWith('obj') ? '3dPhoto' : ''),
        src: file
      })
    }
    onChange && onChange([...(value || []), ...list])
  }

  function removeThis(idx) {
    onChange && onChange([...slice(value, 0, idx), ...slice(value, idx + 1)])
  }

  return (
    <>
      <Typography 
        sx={(theme) => ({
          color: theme.palette.grayLabelText.main,
          mb: 0.5
        })}
      >
        {label}
      </Typography>

      <Box 
        sx={(theme) => ({
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: theme.palette.grayText.light,
          borderRadius: theme.spacing(1),
        })}
      >
        <Dropzone onDrop={onDrop} disabled={disabled} accept={accept}>
          {({getRootProps, getInputProps}) =>
            <Button
              {...getRootProps()}
              sx={(theme) => ({
                backgroundColor: theme.palette.grayBg.main,
                px: 2,
                height: 150,
              })}
              fullWidth
              disabled={disabled}
            >
              <input {...getInputProps()} />
              {t('dropzone.hint')}
            </Button>
          }
        </Dropzone>

        {Boolean(value?.length) &&
          (listView ? 
            <Grid container sx={{p: 1}}>
              {map(value, (file, idx) =>
                <Grid key={idx} item xs={12}>
                  <FileListItem file={file} onRemove={() => removeThis(idx)} disabled={disabled} idx={idx}/>
                </Grid>
              )}
            </Grid> : 
            <Grid container sx={{p: 1}}>
              {map(value, (file, idx) =>
                <Grid key={idx} item>
                  <FileGridCard file={file} onRemove={() => removeThis(idx)} disabled={disabled}/>
                </Grid>
              )}
            </Grid>
          )
        }
      </Box>
    </>
  )
}