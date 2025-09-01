import { locales, useI18n } from '../i18n'

export default function LanguageSwitcher({ isDarkMode }: { isDarkMode: boolean }) {
  const { locale, setLocale, t } = useI18n()
  return (
    <select
      aria-label={t('language')}
      value={locale}
      onChange={e => setLocale(e.target.value as any)}
      className={`border rounded-md px-2 py-1 text-sm
        ${isDarkMode
          ? "bg-gray-800 text-white border-gray-600"
          : "bg-white text-gray-900 border-gray-300"
        }`}
    >
      {locales.map(l => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  )
}
