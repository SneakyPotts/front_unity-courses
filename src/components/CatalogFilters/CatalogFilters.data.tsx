import { Rating } from '@smastrom/react-rating'

export const filtersRatings = {
  title: 'Рейтинг',
  name: 'rating',
  filters: Array.from({ length: 5 }, (_, i) => ({
    id: `rating${i + 1}`,
    title: (
      <div
        key={i}
        style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}
      >
        <Rating
          style={{ maxWidth: 100 }}
          value={5 - 0.5 * (i + 1)}
          readOnly
        />
        <span>{5 - 0.5 * (i + 1)} і вище</span>
      </div>
    ),
    value: (5 - 0.5 * (i + 1)).toString(),
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
