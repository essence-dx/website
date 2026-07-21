"use client"

import * as React from "react"
import { arSA, he } from "react-day-picker/locale"

import {
  useTranslation,
  type Translations,
} from "@/components/v4/language-selector"
import { Calendar } from "@/styles/v4/base-nova/ui-rtl/calendar"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

const locales = {
  ar: arSA,
  he: he,
} as const

export function CalendarRtl() {
  const { dir, language } = useTranslation(translations, "ar")
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border [--cell-size:2.25rem]"
      captionLayout="dropdown"
      dir={dir}
      locale={
        dir === "rtl" ? locales[language as keyof typeof locales] : undefined
      }
    />
  )
}
