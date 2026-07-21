"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/v4/language-selector"
import { Slider } from "@/styles/v4/base-nova/ui-rtl/slider"

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

export function SliderRtl() {
  const { dir } = useTranslation(translations, "ar")

  return (
    <Slider
      defaultValue={[75]}
      max={100}
      step={1}
      className="mx-auto w-full max-w-xs"
      dir={dir}
    />
  )
}
