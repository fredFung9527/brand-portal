import useTranslation from 'next-translate/useTranslation'
import { useCallback, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { MyFilePickerProps, MyInputEvent } from '../@types/input'
import { recoilAlert } from '../recoil/common'

export default function MyFilePicker({sizeLimit, onChange, multiple, accept, children}: MyFilePickerProps) {
  const { t } = useTranslation('error')
  const setAlert = useSetRecoilState(recoilAlert)
  const ref = useRef(null)

  const handleInput = useCallback((event: MyInputEvent) => {
    const files = event.target.files
    if (!files?.length) {
      return
    }
    for (let idx = 0; idx < files.length; idx++) {
      const file = files[idx]
      if (file.size > (sizeLimit || 10 * 1024 * 1024)) {
        setAlert(`error:${t('fileTooLarge')}`)
        return
      }
    }
    onChange && onChange(multiple ? files : files[0])
  }, [onChange])

  return (
    <>
      <div onClick={() => ref && ref.current.click()}>
        { children }
      </div>
      <input
        type="file"
        hidden
        onChange={handleInput}
        multiple={multiple}
        accept={accept || 'image/*'}
        ref={ref}
      />
    </>
  )
}