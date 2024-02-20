import { format } from 'date-fns'
import { uk } from 'date-fns/locale'

import { ImageProps } from 'next/image'

const blurData =
  // eslint-disable-next-line max-len
  'data:image/webp;base64,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'

export const imgBlur: Pick<ImageProps, 'placeholder' | 'blurDataURL'> = {
  placeholder: 'blur',
  blurDataURL: blurData,
}

export const courseCaption = {
  live: 'Заняття проводяться з викладачем у live режимі (НЕ відео-запис)',
  self: 'Заняття проводяться самостійно',
  mix: 'Заняття проводяться з викладачем у live режимі, та також самостійно.',
}

export const formattedPrice = (price: number) =>
  price.toLocaleString('uk-UA', {
    maximumFractionDigits: 0,
    // minimumFractionDigits: fractionDigits,
  })

export function formatDateInGenitive(date: Date): string {
  const genitiveMonths = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня']

  const formattedTime = format(date, 'dd LLLL yyyy', { locale: uk })

  const monthName = format(date, 'LLLL', { locale: uk })
  const monthNameGenitive = genitiveMonths[date.getMonth()]

  return formattedTime.replace(monthName, monthNameGenitive)
}
