import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { strings, rtlLocales, type Locale, locales } from './strings'

type I18nCtx = { 
  locale: Locale
  t: (k: string) => string
  setLocale: (l: Locale) => void
  dir: 'ltr' | 'rtl'
}

const Ctx = createContext<I18nCtx | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => 
    (localStorage.getItem('locale') as Locale) || 'en'
  )

  useEffect(() => {
    localStorage.setItem('locale', locale)
    const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', locale)
  }, [locale])

  const t = (k: string) => strings[locale][k] || strings['en'][k] || k

  const value = useMemo<I18nCtx>(() => ({
    locale,
    t,
    setLocale,
    dir: (rtlLocales.includes(locale) ? 'rtl' : 'ltr') as 'ltr' | 'rtl'
  }), [locale])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() { 
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx 
}

export { locales }
