'use client'

import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { Checkbox } from '@UI/Checkbox'
import { Button } from '@UI/Button'
import { Modal } from '@UI/Modal'

const filtersList = [
  {
    title: 'Теми',
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

const tabs = [
  {
    title: 'Всі',
  },
  {
    title: 'Фінанси',
  },
  {
    title: 'Англійська',
  },
  {
    title: 'Програми',
  },
  {
    title: 'Підготовка',
  },
]

export default function CoursesCatalog() {
  const [isBodyVisible, setIsBodyVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(1)

  const toggleBodyVisibility = () => {
    setIsBodyVisible(!isBodyVisible)
  }

  return (
    <div className="content">
      <div className="content__container container">
        <section className={'courses-catalog'}>
          <div className={'courses-catalog__wrapper'}>
            <div className={'courses-catalog__body'}>
              <div className={classNames('courses-catalog__filter', { visible: isBodyVisible })}>
                <div className={'courses-catalog__filter-body'}>
                  <h2 className={'courses-catalog__title'}>Фільтрувати</h2>
                  <h2 className={'courses-catalog__mobile close'}>Фільтр</h2>
                  <div className={'courses-catalog__inner'}>
                    {filtersList.map((filterBlock, index) => (
                      <Fragment key={`${index}${filterBlock.title}`}>
                        <p className={'courses-catalog__subtitle'}>{filterBlock.title}</p>
                        <ul className={classNames('courses-catalog__list', filterBlock.extraClass)}>
                          {filterBlock.filters.map((filterItem, jIndex) => (
                            <li key={`${jIndex}${filterItem}`}>
                              <Checkbox
                                classWrapper={'some-wrapper-class courses-catalog__item'}
                                label={filterItem}
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

            <div className={'courses-catalog__catalog'}>
              <div className="courses-catalog__menu">
                <nav className="courses-catalog__navigation">
                  <ul className={'courses-catalog__tabs'}>
                    {tabs.map((tab, index) => (
                      <li key={`${index}${tab.title}`}>
                        <button
                          className={classNames('courses-catalog__tab', { 'courses-catalog__tab--active': activeTab === index + 1 })}
                          onClick={() => setActiveTab(index + 1)}
                        >
                          {tab.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="courses-catalog__palen">
                  <div className={'courses-catalog__search'}>
                    <input
                      className={'input courses-catalog__search-input'}
                      placeholder={'Почніть вводити текст'}
                      type=""
                    />
                    <svg className="nav__link-svg courses-catalog__search-svg">
                      <use href="/img/sprite.svg#search"></use>
                    </svg>
                  </div>

                  <button
                    onClick={toggleBodyVisibility}
                    className={'courses-catalog__toggle close'}
                  >
                    <svg className="courses-catalog__toggle-svg">
                      <use href="/img/sprite.svg#filter"></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="courses-catalog__cards">
                <CourseCardPaid />
                <CourseCardFree />
                <CourseCardPaid />
                <CourseCardFree />
                <CourseCardPaid />
                <CourseCardFree />
                <CourseCardPaid />
                <CourseCardFree />
                <CourseCardPaid />
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
      </div>
    </div>
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
            <img
              src="https://loremflickr.com/640/360"
              alt=""
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
              <img
                src="https://loremflickr.com/640/360"
                alt=""
              />
            </div>
            <button>Бондар О. М.</button>
          </div>
          <div className={'courses-catalog__teacher'}>
            <div className={'courses-catalog__teacher-img'}>
              <img
                src="https://loremflickr.com/640/360"
                alt=""
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
            <img
              src="https://loremflickr.com/640/360"
              alt=""
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
              <img
                src="https://loremflickr.com/640/360"
                alt=""
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
