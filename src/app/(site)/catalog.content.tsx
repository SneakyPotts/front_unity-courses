'use client'

import classNames from 'classnames'
import { Fragment, useContext } from 'react'

import { CatalogFilterPopup } from '@components/CatalogFilterPopup'
import { appContext } from '@components/Context/context'
import { CourseCardFree, CourseCardPaid, CourseCardPaidPromotion, CourseCatalogItem } from '@components/CourseCatalogItem'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { TCatalog, TCourse } from '@http/courses/type'
import { Rating } from '@smastrom/react-rating'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { PageWrapper } from '_ui/PageWrapper'

const filtersList = [
  {
    title: '',
    filters: Array.from({ length: 5 }, (_, i) => (
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
    )),
  },
  {
    title: 'Теми',
    button: '1',
    filters: [
      'ІТ',
      'Англійська мова',
      'Особистий розвиток',
      'Підготовка до ЗНО',
      'Право',
      'Психологія',
      'Суспільні науки',
      'ІТ',
      'Англійська мова',
      'Особистий розвиток',
      'Підготовка',
      'Право',
      'Психологія',
      'Суспільні науки',
    ],
    extraClass: '',
  },
  {
    title: 'Сертифікація',
    filters: ['З сертифікатом', 'Підвищення кваліфікації'],
    extraClass: '',
  },
  {
    title: 'Ціна',
    filters: ['Платні', 'Безкоштовно'],
    extraClass: '',
  },
  {
    title: 'Формат курсу',
    filters: ['Самостійне проходження', 'Live', 'Комбіновано'],
    extraClass: '',
  },
  {
    title: 'Цільова аудиторія',
    filters: ['1 клас', '2 клас', '3 клас', '4 клас', '5 клас', '6 клас', '7 клас', '8 клас', '9 клас', '10 клас', '11 клас'],
    extraClass: 'courses-catalog__class',
  },
]

const courseMockData: TCourse[] = [
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

interface CatalogContentProps {
  data?: TCatalog
}

export function CatalogContent({ data }: CatalogContentProps) {
  const { asideIsOpen } = useContext(appContext)

  useSetHeaderParams({ title: 'Каталог курсів' })

  console.log(data?.results)

  return (
    <PageWrapper>
      <section className={'courses-catalog'}>
        <div className={'courses-catalog__wrapper'}>
          {!asideIsOpen && (
            <div className={'courses-catalog__body'}>
              <div className={'courses-catalog__filter '}>
                <div className={'courses-catalog__filter-body'}>
                  <h2 className={'courses-catalog__title'}>Фільтрувати</h2>
                  <div className={'courses-catalog__mobile'}>
                    <h2 className={'courses-catalog__mobile-title'}>Фільтр</h2>
                    <button className={'courses-catalog__mobile-btn'}>
                      <svg>
                        <use href="/img/sprite.svg#close"></use>
                      </svg>
                    </button>
                  </div>
                  <div className={'courses-catalog__inner'}>
                    {filtersList.map((filterBlock, index) => (
                      <Fragment key={`${index}${filterBlock.title}`}>
                        <p className={'courses-catalog__subtitle'}>{filterBlock.title}</p>
                        <ul className={classNames('courses-catalog__list', filterBlock.extraClass)}>
                          {filterBlock.filters.map((filterItem, jIndex) => (
                            <li key={`${jIndex}${filterItem}`}>
                              <Checkbox
                                classWrapper={'some-wrapper-class courses-catalog__item'}
                                label={filterItem as string}
                              />
                            </li>
                          ))}
                        </ul>
                      </Fragment>
                    ))}
                  </div>
                  <div className="courses-catalog__buttons close">
                    <Button className={'some_button'}>застосувати</Button>

                    <Button
                      className={'some_button courses-catalog__buttons-btn'}
                      variant={'border'}
                    >
                      скинути фільтри
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={'courses-catalog__catalog'}>
            <CatalogFilterPopup />

            <div className="courses-catalog__cards">
              {data?.results?.map((v) => (
                <CourseCatalogItem
                  key={v.id}
                  {...v}
                />
              ))}
              {courseMockData.map((v) => (
                <CourseCatalogItem
                  key={v.id}
                  {...v}
                />
              ))}
              {/*<CourseCardPaid />*/}
              {/*<CourseCardPaidPromotion />*/}
              {/*<CourseCardFree />*/}
              {/*{Array.from({ length: 9 }, (_, i) =>*/}
              {/*  i % 3 === 0 ? <CourseCardPaidPromotion key={i} /> : i % 2 === 0 ? <CourseCardFree key={i} /> : <CourseCardPaid key={i} />,*/}
              {/*)}*/}
            </div>
            <div className={'courses-catalog__paginations'}>
              <ul className={'courses-catalog__paginations-list'}>
                <li className={'courses-catalog__paginations-item courses-catalog__paginations--active'}>1</li>
                <li className={'courses-catalog__paginations-item'}>2</li>
                <li className={'courses-catalog__paginations-item'}>3</li>
                <li className={'courses-catalog__paginations-item'}>4</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
