import { TCourse } from '@http/courses/type'
import { Rating } from '@smastrom/react-rating'

export const filtersRatings = {
  title: 'Рейтинг',
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
  })),
  extraClass: '',
}

export const filtersList = [
  {
    title: 'Сертифікація',
    filters: [
      { id: 'sertif1', title: 'З сертифікатом' },
      { id: 'sertif2', title: 'Підвищення кваліфікації' },
    ],
    extraClass: '',
  },
  {
    title: 'Ціна',
    filters: [
      { id: 'price1', title: 'Платні' },
      { id: 'price2', title: 'Безкоштовно' },
    ],
    extraClass: '',
  },
  {
    title: 'Формат курсу',
    filters: [
      { id: 'form1', title: 'Самостійне проходження' },
      { id: 'form2', title: 'Live' },
      { id: 'form3', title: 'Комбіновано' },
    ],
    extraClass: '',
  },
]

export const courseMockData: TCourse[] = [
  {
    id: 'asdasd#1',
    title: 'Тестовий курс',
    start_date: '2020-01-01',
    categories_repr: ['Тестовий курс', 'IT'],
    price: 1100,
    discount: 1099,
    rating: 3.8,
    color: '',
    cover: 'https://loremflickr.com/640/360',
    format: 'live',
    lectors: [
      {
        id: 'asdasd#1',
        first_name: 'ВасилІй',
        last_name: 'Іванов',
        patronymic: 'Іванович',
        avatar: 'https://loremflickr.com/640/360',
      },
    ],
    number_of_lectures: 101,
    max_number_of_students: 0,
    number_of_students: 0,
  },
  {
    id: 'asdasd#2',
    title: 'Тестовий курс 2',
    start_date: '2020-01-01',
    categories_repr: ['Тестовий курс', 'IT'],
    price: 0,
    discount: 0,
    rating: 3.8,
    color: 'pink',
    cover: 'https://loremflickr.com/640/360',
    format: 'live',
    lectors: [
      {
        id: 'asdasd#1',
        first_name: 'ВасилІй',
        last_name: 'Іванов',
        patronymic: 'Іванович',
        avatar: 'https://loremflickr.com/640/360',
      },
    ],
    number_of_lectures: 101,
    max_number_of_students: 10,
    number_of_students: 9,
  },
  {
    id: 'asdasd#3',
    title: 'Тестовий курс 3. Поглиблене вивчення',
    start_date: '2020-01-01',
    categories_repr: ['Тестовий курс', 'IT'],
    price: 9991,
    discount: 0,
    rating: 3.8,
    color: '#fff8ed',
    cover: 'https://loremflickr.com/640/360',
    format: 'live',
    lectors: [
      {
        id: 'asdasd#1',
        first_name: 'Василій',
        last_name: 'Іванов',
        patronymic: 'Іванович',
        avatar: 'https://loremflickr.com/640/360',
      },
      {
        id: 'asdasd#2',
        first_name: 'Василіса',
        last_name: 'Іванова',
        patronymic: 'Іванівна',
        avatar: 'https://loremflickr.com/640/360',
      },
    ],
    number_of_lectures: 101,
    max_number_of_students: 10,
    number_of_students: 9,
  },
]
