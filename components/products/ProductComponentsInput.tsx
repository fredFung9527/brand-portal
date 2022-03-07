import { MyInputProps } from '../../@types/input'
import useTranslation from 'next-translate/useTranslation'
import { checkRequired } from '../../utils/rules'
import MyListInput from '../MyListInput'
import MyAutocomplete from '../select/MyAutocomplete'
import { demoComponentTypes, demoMaterials } from '../../demo/product'
import AXCodeInput from './AXCodeInput'

const emptyComponent = {
  axCode: '',
  type: null,
  remarks: '',
  materials: [],
  colors: []
}

export default function ProductComponentsInput(props: MyInputProps & {showError: boolean, onValid: any}) {
  const { t } = useTranslation('products')
  return (
    <MyListInput
      {...props}
      label={t('components')}
      defaultValue={emptyComponent}
      required
      items={[
        {
          key: 'axCode',
          label: t('axCode'),
          rules: [checkRequired(t('error:required'))],
          type: 'custom',
          component: <AXCodeInput/>,
          grid: { xs: 12, sm: 6 }
        },
        {
          key: 'type',
          label: t('componentType'),
          rules: [checkRequired(t('error:required'))],
          type: 'custom',
          component: <MyAutocomplete items={demoComponentTypes}/>,
          grid: { xs: 12, sm: 6 }
        },
        {
          key: 'materials',
          label: t('materials'),
          rules: [checkRequired(t('error:required'))],
          type: 'custom',
          component: <MyAutocomplete multiple items={demoMaterials}/>,
          grid: 12
        },
        {
          key: 'colors',
          label: t('colors'),
          rules: null,
          type: 'custom',
          component: <MyAutocomplete freeSolo multiple items={[]}/>,
          grid: 12
        },
        {
          key: 'remarks',
          label: t('remarks'),
          rules: null,
          type: 'text',
          grid: 12
        },
      ]}
    />
  )
}