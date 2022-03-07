import { MyInputProps } from '../../@types/input'
import useTranslation from 'next-translate/useTranslation'
import { checkRequired } from '../../utils/rules'
import MyListInput from '../MyListInput'
import MyAutocomplete from '../select/MyAutocomplete'
import ProductMarketCodeInput from './ProductMarketCodeInput'
import { demoVerdors } from '../../demo/sales'

const emptyVendor = {
  marketCode: null,
  brandRefCode: '',
  value: ''
}

export default function PCCUsagesInput(props: MyInputProps & {showError: boolean, onValid: any}) {
  const { t } = useTranslation('products')
  return (
    <MyListInput
      {...props}
      label={t('usages')}
      defaultValue={emptyVendor}
      color='warning'
      items={[
        {
          key: 'marketCode',
          label: t('marketCode'),
          rules: [checkRequired(t('error:required'))],
          type: 'custom',
          component: <ProductMarketCodeInput single/>,
          grid: { xs: 12, sm: 6 }
        },
        {
          key: 'brandRefCode',
          label: t('brandRefCode'),
          rules: [checkRequired(t('error:required'))],
          type: 'text',
          grid: { xs: 12, sm: 6 }
        },
        {
          key: 'value',
          label: t('value'),
          rules: [checkRequired(t('error:required'))],
          type: 'custom',
          component: <MyAutocomplete freeSolo items={demoVerdors}/>,
          grid: { xs: 12, sm: 6 }
        },
      ]}
    />
  )
}