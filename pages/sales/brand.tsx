import { useState } from 'react'
import GridViewSales from '../../components/sales/GridViewSales'
import TableViewSales from '../../components/sales/TableViewSales'
import SalesToolBar from '../../components/sales/SalesToolBar'
import { useRecoilValue } from 'recoil'
import { recoilSalesFilterSettings, recoilSalesKeyword } from '../../recoil/sales'

export default function Brand({oldMode}) {
  const [mode, setMode] = useState(oldMode || 'grid')
  const filterSettings = useRecoilValue(recoilSalesFilterSettings)
  const keyword = useRecoilValue(recoilSalesKeyword)

  return (
    <>
      <SalesToolBar mode={mode} setMode={setMode}/>
      
      {mode === 'grid' ? 
        <GridViewSales
          keyword={keyword}
          filterSettings={filterSettings}
        /> : 
        <TableViewSales
          keyword={keyword}
          filterSettings={filterSettings}
        />
      }
    </>
  )
}

Brand.needLogin = true

export async function getServerSideProps({query}) {
  const { mode } = query
  return {
    props: {
      oldMode: mode || ''
    }
  }
}