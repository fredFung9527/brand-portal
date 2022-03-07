import useTranslation from 'next-translate/useTranslation'

export default function LastUpdate({item, mode='default'}) {
  const { t } = useTranslation('common')

  return (
    <span>{item.lastUpdatedBy} {mode === 'default' ? t('updatedOn') : ''} {item.lastUpdated}</span>
  )
}