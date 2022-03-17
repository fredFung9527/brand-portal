import useTranslation from 'next-translate/useTranslation'

export default function LastUpdate({item, mode='default'}) {
  const { t } = useTranslation('common')

  return (
    <span>{item?.updatedBy} {mode === 'default' ? t('updatedOn') : ''} {item?.updated}</span>
  )
}