import { Button, Grid, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { demoMyBrands } from '../../demo/user'
import { filter, includes, map } from 'lodash'
import { demoPCCForSales } from '../../demo/sales'
import SalesToolBar from '../../components/sales/SalesToolBar'
import { useRecoilState, useRecoilValue } from 'recoil'
import { recoilSalesFilterSettings, recoilSalesKeyword } from '../../recoil/sales'

function BrandSummary() {
  const router = useRouter()

  const [filterSettings, setFilterSettings] = useRecoilState(recoilSalesFilterSettings)
  const keyword = useRecoilValue(recoilSalesKeyword)

  const colors: any = ['primary', 'info', 'success', 'warning']
  const [data, setData] = useState([])
  useEffect(() => {
    const result = map(demoMyBrands, brand => {
      const count = filter(demoPCCForSales, it => includes(brand.marketCodes, it.marketCode)).length
      return {...brand, count}
    })
    setData(result)
  }, [filterSettings, keyword])
  
  const selectBrand = useCallback((brand) => {
    setFilterSettings({...filterSettings, marketCodes: brand.marketCodes || []})
    router.push(`/sales/brand?name=${brand.name}`)
  }, [filterSettings])

  return (
    <Grid container spacing={2}>
      {map(data, (brand, idx) =>
        <Grid key={brand.name} item xs={12} sm={6} md={4}>
          <Button
            size='large'
            color={colors[Math.floor(idx / 2) % colors.length]}
            variant={idx % 2 ? 'outlined' : 'contained'}
            sx={(theme) => ({
              mt: 2,
              borderRadius: theme.spacing(4),
              height: 150
            })}
            fullWidth
            onClick={() => selectBrand(brand)}
          >
            <Grid container direction='column'>
              <Typography variant='h6' sx={{mb: 2}}>
                {brand.name}
              </Typography>
              <Typography>
                {brand.count}
              </Typography>
            </Grid>
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default function Sales() {
  return (
    <>
      <SalesToolBar summaryMode/>
      <BrandSummary/>
    </>
  )
}

Sales.needLogin = true