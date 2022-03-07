import { MyInputProps } from '../../@types/input'
import useTranslation from 'next-translate/useTranslation'
import { checkRequired } from '../../utils/rules'
import MyListInput from '../MyListInput'
import { demoCurrencies } from '../../demo/sales'
import ProductSeasonInput from '../products/ProductSeasonInput'
import { demoUnits } from '../../demo/sales'
import PriceRangeIcon from './PriceRangeIcon'

const emptyItem = {
  'season': '',
  'isActive': 'active',
  'currency': 'USD',
  'value': '',
  'unit': 'PCS',
}

export default function SalesPriceInput(props: MyInputProps & {showError: boolean, onValid: any}) {
  const { t } = useTranslation('products')
  return (
    <MyListInput
      {...props}
      label={t('prices')}
      defaultValue={emptyItem}
      required
      items={[
        {
          key: 'season',
          label: t('season'),
          rules: [checkRequired(t('error:required'))],
          type: 'custom',
          component: <ProductSeasonInput single/>,
          grid: { xs: 12, sm: 6 }
        },
        {
          key: 'isActive',
          label: t('status'),
          rules: null,
          type: 'select',
          items: [
            {text: t('active'), value: 'active'}, 
            {text: t('disabled'), value: 'disabled'}
          ],
          otherProps: {
            required: true
          },
          grid: { xs: 12, sm: 6 }
        },
        {
          key: 'currency',
          label: t('currency'),
          rules: [checkRequired(t('error:required'))],
          type: 'select',
          items: demoCurrencies,
          hidden: (v) => v.isActive === 'disabled',
          grid: { xs: 12, sm: 6 }
        },
        {
          key: 'value',
          label: t('value'),
          rules: null,
          type: 'number',
          hidden: (v) => v.isActive === 'disabled',
          grid: { xs: 12, sm: 6 }
        },
        {
          key: 'unit',
          label: t('unit'),
          rules: [checkRequired(t('error:required'))],
          type: 'select',
          items: demoUnits,
          hidden: (v) => v.isActive === 'disabled',
          grid: { xs: 12, sm: 6 }
        }
      ]}
      extraAction={<PriceRangeIcon/>}
    />
  )
}