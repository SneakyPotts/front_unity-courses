'use client'

import classNames from 'classnames'
import { Fragment, useContext, useState } from 'react'

import Image from 'next/image'

import { imgBlur } from '@assets/utils'
import { CatalogFilterPopup } from '@components/CatalogFilterPopup'
import { appContext } from '@components/Context/context'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { Modal } from '_ui/Modal'
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

export default function CoursesCatalog() {
  const { asideIsOpen } = useContext(appContext)

  useSetHeaderParams({ title: 'Каталог курсів' })

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
              {Array.from({ length: 9 }, (_, i) =>
                i % 3 === 0 ? <CourseCardPaidPromotion key={i} /> : i % 2 === 0 ? <CourseCardFree key={i} /> : <CourseCardPaid key={i} />,
              )}
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

function CourseCardPaid() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={'courses-catalog__element'}>
      <div className="courses-catalog__box">
        <span className={'courses-catalog__tag'}>Програми</span>
        <span className={'courses-catalog__lesson courses-catalog__decor '}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#material"></use>{' '}
          </svg>
          25 занять
        </span>
        <span className={'courses-catalog__review courses-catalog__decor '}>
          <svg className={'courses-catalog__svg '}>
            <use href="/img/sprite.svg#star"></use>{' '}
          </svg>
          4.5
        </span>
        <div className={'courses-catalog__photo'}>
          <a href="#">
            <Image
              src="https://loremflickr.com/640/360"
              width={640}
              height={360}
              alt=""
              {...imgBlur}
            />
          </a>
        </div>
      </div>
      <div className={'courses-catalog__info'}>
        <a
          className={'courses-catalog__info-title'}
          href="#"
        >
          Вступ до мови програмування Python
        </a>
        <div className={'courses-catalog__teachers'}>
          <div className={'courses-catalog__teacher'}>
            <div className={'courses-catalog__teacher-img'}>
              <Image
                src="https://loremflickr.com/640/360"
                style={{ objectFit: 'cover' }}
                alt="alt"
                width={640}
                height={360}
                {...imgBlur}
              />
            </div>
            <button>Бондар О. М.</button>
          </div>
          <div className={'courses-catalog__teacher'}>
            <div className={'courses-catalog__teacher-img'}></div>
            <button>Бондар О. М.</button>
          </div>
        </div>
        <div className={'courses-catalog__conditions'}>
          <div className={'courses-catalog__data'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>{' '}
            </svg>
            <p>
              старт - <span>10.12.2023</span>
            </p>
          </div>
          <div className={'courses-catalog__persons'}>
            <svg className={'courses-catalog__svg courses-catalog__svg-stroke'}>
              <use href="/img/sprite.svg#person"></use>{' '}
            </svg>
            <p>
              вільних: <span>8 з 18</span>
            </p>
          </div>
        </div>
      </div>
      <div className={'courses-catalog__price'}>
        <p>5 300 грн.</p>
        <Button
          className={'some_button courses-catalog__btn'}
          onClick={() => setShowModal(true)}
        >
          <svg className="courses-catalog__svg courses-catalog__svg-rocket ">
            <use href="/img/sprite.svg#rocket"></use>
          </svg>
          Хочу на курс
        </Button>
      </div>
      {showModal && <CourseInviteModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

function CourseCardPaidPromotion() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={'courses-catalog__element'}>
      <div className="courses-catalog__box">
        <span className={'courses-catalog__tag'}>Програми</span>
        <span className={'courses-catalog__lesson courses-catalog__decor '}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#material"></use>{' '}
          </svg>
          25 занять
        </span>
        <span className={'courses-catalog__review courses-catalog__decor '}>
          <svg className={'courses-catalog__svg '}>
            <use href="/img/sprite.svg#star"></use>{' '}
          </svg>
          4.5
        </span>
        <div className={'courses-catalog__photo'}>
          <a href="#">
            <Image
              src="https://loremflickr.com/640/360"
              style={{ objectFit: 'cover' }}
              alt="alt"
              width={640}
              height={360}
              {...imgBlur}
            />
          </a>
        </div>
      </div>
      <div className={'courses-catalog__info'}>
        <a
          className={'courses-catalog__info-title'}
          href="#"
        >
          Вступ до мови програмування Python
        </a>
        <div className={'courses-catalog__teachers'}>
          <div className={'courses-catalog__teacher'}>
            <div className={'courses-catalog__teacher-img'}>
              <Image
                src="https://loremflickr.com/640/360"
                style={{ objectFit: 'cover' }}
                alt="alt"
                width={640}
                height={360}
                {...imgBlur}
              />
            </div>
            <button>Бондар О. М.</button>
          </div>
          <div className={'courses-catalog__teacher'}>
            <div className={'courses-catalog__teacher-img'}>
              <Image
                src="https://loremflickr.com/640/360"
                style={{ objectFit: 'cover' }}
                alt="alt"
                width={640}
                height={360}
                {...imgBlur}
              />
            </div>
            <button>Бондар О. М.</button>
          </div>
        </div>
        <div className={'courses-catalog__conditions'}>
          <div className={'courses-catalog__data'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>{' '}
            </svg>
            <p>
              старт - <span>10.12.2023</span>
            </p>
          </div>
          <div className={'courses-catalog__persons'}>
            <svg className={'courses-catalog__svg courses-catalog__svg-stroke'}>
              <use href="/img/sprite.svg#person"></use>{' '}
            </svg>
            <p>
              вільних: <span>8 з 18</span>
            </p>
          </div>
        </div>
      </div>
      <div className={'courses-catalog__prices'}>
        <div className={'courses-catalog__cost'}>
          <s className={'courses-catalog__cost-discount'}>6800</s>
          <p>5 300 грн.</p>
        </div>
        <Button
          className={'some_button courses-catalog__btn'}
          onClick={() => setShowModal(true)}
        >
          <svg className="courses-catalog__svg courses-catalog__svg-rocket ">
            <use href="/img/sprite.svg#rocket"></use>
          </svg>
          Хочу на курс
        </Button>
      </div>
      {showModal && <CourseInviteModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

function CourseCardFree() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className={'courses-catalog__element'}>
      <div className="courses-catalog__box">
        <span className={'courses-catalog__tag'}>ІТ</span>
        <span className={'courses-catalog__lesson courses-catalog__decor '}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#material"></use>{' '}
          </svg>
          25 занять
        </span>
        <span className={'courses-catalog__review courses-catalog__decor '}>
          <svg className={'courses-catalog__svg'}>
            <use href="/img/sprite.svg#star"></use>{' '}
          </svg>
          4.5
        </span>
        <div className={'courses-catalog__photo'}>
          <a href="#">
            <Image
              src="https://loremflickr.com/640/360"
              style={{ objectFit: 'cover' }}
              alt="alt"
              width={640}
              height={360}
              {...imgBlur}
            />
          </a>
        </div>
      </div>
      <div className={'courses-catalog__info'}>
        <a
          className={'courses-catalog__info-title'}
          href="#"
        >
          Medium рівень програмування на JavaScript
        </a>
        <div className={'courses-catalog__teachers'}>
          <div className={'courses-catalog__teacher'}>
            <div className={'courses-catalog__teacher-img'}>
              <Image
                src="https://loremflickr.com/640/360"
                style={{ objectFit: 'cover' }}
                alt="alt"
                width={640}
                height={360}
                {...imgBlur}
              />
            </div>
            <button>Бондар О. М.</button>
          </div>
        </div>
        <div className={'courses-catalog__conditions'}>
          <div className={'courses-catalog__data'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>{' '}
            </svg>
            <p>
              старт - <span>10.12.2023</span>
            </p>
          </div>
          <div className={'courses-catalog__persons'}>
            <svg className={'courses-catalog__svg courses-catalog__svg-stroke'}>
              <use href="/img/sprite.svg#person"></use>{' '}
            </svg>
            <p>необмежено</p>
          </div>
        </div>
      </div>
      <div className={'courses-catalog__price'}>
        <p>Безкоштовно</p>
        <Button
          className={'some_button courses-catalog__btn '}
          onClick={() => setShowModal(true)}
        >
          <svg className="courses-catalog__svg courses-catalog__svg-rocket ">
            <use href="/img/sprite.svg#rocket"></use>
          </svg>
          Хочу на курс
        </Button>
      </div>
      {showModal && <CourseInviteModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
// добавить max-width: rem(620); к родителю модалки

interface CourseInviteModalProps {
  onClose: () => void
}

function CourseInviteModal({ onClose }: CourseInviteModalProps) {
  return (
    <Modal
      variant="courseInvite" /*course-invite*/
      title="Запрос на курс"
      onClose={onClose}
    >
      <div className={'modal__main-decor'}>
        <svg className={'modal__coures-svg'}>
          <use href="/img/sprite.svg#rocket"></use>{' '}
        </svg>
      </div>
      <div className={'modal__main-box'}>
        <p className={'modal__main-text'}>Батькам буде відправлено запрос на покупку курсу “Вступ до мови програмування Python“</p>
      </div>
      <div className={'modal__main-buttons'}>
        <Button
          className={'some_button modal__main-button '}
          variant={'border'}
        >
          відхилити
        </Button>
        <Button className={'some_button modal__main-button'}>підтвердити</Button>
      </div>
    </Modal>
  )
}

// <div className={'devLayoutPage'}>
//   <div>DevLayoutPage</div>
//   <Checkbox
//     classWrapper={'some-wrapper-class'}
//     label={'Some label checkbox'}
//   />
//   <Button className={'some_button'}>1
//     <svg className="courses-catalog__svg">
//       <use href="/img/sprite.svg#notifications"></use>
//     </svg>
//     Some text
//   </Button>
//   <Button
//     className={'some_button'}
//     disabled
//   >
//     <svg className="courses-catalog__svg">
//       <use href="/img/sprite.svg#notifications"></use>
//     </svg>
//     Some text
//   </Button>
//   <Button
//     className={'some_button'}
//     variant={'gray'}
//   >
//     <svg className="courses-catalog__svg">
//       <use href="/img/sprite.svg#notifications"></use>
//     </svg>
//     Some text
//   </Button>
//   <Button
//     className={'some_button'}
//     variant={'border'}
//   >
//     <svg className="courses-catalog__svg">
//       <use href="/img/sprite.svg#notifications"></use>
//     </svg>
//     Some text
//   </Button>
//   <CourseCard />
//   <CourseCard />
//   <CourseCard />
//   <CourseCard />
// </div>
