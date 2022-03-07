import { MyInputProps } from '../../@types/input'
import useTranslation from 'next-translate/useTranslation'
import { checkPrice, checkRequired, checkYesNo } from '../../utils/rules'
import MyListInput from '../MyListInput'
import MyAutocomplete from '../select/MyAutocomplete'
import { demoTestingType } from '../../demo/product'
import ProductPullTestInput from './ProductPullTestInput'

const emptyTesting = {
  type: null,
  result: ''
}

export default function PCCTestingsInput(props: MyInputProps & {showError: boolean, onValid: any}) {
  const { t } = useTranslation('products')
  return (
    <MyListInput
      {...props}
      label={t('testings')}
      defaultValue={emptyTesting}
      color='info'
      items={[
        {
          key: 'type',
          label: t('type'),
          rules: [checkRequired(t('error:required'))],
          type: 'custom',
          component: <MyAutocomplete items={demoTestingType}/>,
          grid: { xs: 12, sm: 6 }
        },
        {
          key: 'result',
          label: t('result'),
          rules: [checkYesNo(t('error:required'))],
          type: 'select',
          items: ['Yes', 'No'],
          hidden: (item) => (!item.type || item.type === 'Pull Test'),
          grid: { xs: 12, sm: 6 }
        },
        {
          key: 'result',
          label: t('result'),
          rules: [checkPrice(t('error:required'))],
          type: 'custom',
          component: <ProductPullTestInput/>,
          hidden: (item) => (item.type && item.type === 'Needle Detection'),
          grid: { xs: 12, sm: 6 }
        },
      ]}
      parseNewValue={(oldV, newV) => {
        if (oldV.type && newV.type) {
          return oldV.type === newV.type ? newV : {...newV, result: ''}
        } else if (oldV.type) {
          return newV
        } else {
          if (newV.result) {
            const notNumber = isNaN(Number(newV.result))
            if (newV.type === 'Needle Detection' && !notNumber) {
              return {...newV, result: ''}
            }
            if (newV.type === 'Pull Test' && notNumber) {
              return {...newV, result: ''}
            }
            return newV
          } else {
            return newV
          }
        }
      }}
    />
  )
}