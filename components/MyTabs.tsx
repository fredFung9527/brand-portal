import { Tab, Tabs } from '@mui/material'
import { map } from 'lodash'
import { useEffect, useState } from 'react'
import { MyTabsProps } from '../@types/input'

function ForObjects({onChange, items, sx, vertical, textKey}: MyTabsProps) {
  const [idx, setIdx] = useState(-1)
  useEffect(() => {
    if (!items?.length) {
      setIdx(-1)
      return
    }
    if (idx) {
      setIdx(0)
    } else {
      onChange(items[0])
    }
  }, [items])
  useEffect(() => {
    if (idx < 0) {
      onChange(null)
    } else {
      onChange(items[idx])
    }
  }, [idx])

  if (idx < 0 || !items?.length) {
    return null
  }
  return (
    <Tabs 
      value={idx} 
      onChange={(event, newValue) => setIdx(newValue)}
      orientation={vertical ? 'vertical' : 'horizontal'}
      variant='scrollable'
      sx={sx}
    >
      {map(items, (it, idx) =>
        <Tab key={idx} label={textKey ? it[textKey] : it} value={Number(idx)}/>
      )}
    </Tabs>
  )
}

function ForTexts({value, onChange, items, sx, vertical}: MyTabsProps) {
  return (
    <Tabs 
      value={value} 
      onChange={(event, newValue) => onChange && onChange(newValue)}
      orientation={vertical ? 'vertical' : 'horizontal'}
      variant='scrollable'
      sx={sx}
    >
      {map(items, (it, idx) =>
        <Tab key={idx} label={it.text || it} value={it.value || it}/>
      )}
    </Tabs>
  )
}

export default function MyTabs(props: MyTabsProps) {
  if (props?.textKey) {
    return <ForObjects {...props}/>
  } else {
    return <ForTexts {...props}/>
  }
}