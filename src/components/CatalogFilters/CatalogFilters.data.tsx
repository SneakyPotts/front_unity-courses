import { ReactNode } from 'react'

import type { TFilterBlock } from '@http/courses/type'
import { Rating, Star } from '@smastrom/react-rating'

import { RatingStars } from '_ui/RatingStars'

export const filtersRatings: TFilterBlock = {
  title: 'Рейтинг',
  name: 'rating',
  filters: Array.from({ length: 5 }, (_, i) => ({
    id: `rating${i + 1}`,
    title: (
      <div
        key={i}
        style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}
      >
        <RatingStars
          value={5 - 0.5 * (i + 1)}
          readOnly
        />
        <span>{5 - 0.5 * (i + 1)} і вище</span>
      </div>
    ) as ReactNode,
    value: `m${(5 - 0.5 * (i + 1)).toString().replace(/\./, '_')}`,
  })),
  extraClass: '',
}

export const filtersList = [
  {
    title: 'Сертифікація',
    name: 'has_certificate',
    filters: [
      { id: 'sertif1', title: 'З сертифікатом', value: true },
      { id: 'sertif2', title: 'Підвищення кваліфікації', value: false },
    ],
    extraClass: '',
  },
  {
    title: 'Ціна',
    name: 'paid',
    filters: [
      { id: 'price1', title: 'Платні', value: true },
      { id: 'price2', title: 'Безкоштовно', value: false },
    ],
    extraClass: '',
  },
  {
    title: 'Формат курсу',
    name: 'form',
    filters: [
      { id: 'form1', title: 'Самостійне проходження', value: 'self' },
      { id: 'form2', title: 'Live', value: 'live' },
      { id: 'form3', title: 'Комбіновано', value: 'mix' },
    ],
    extraClass: '',
  },
]
