import { format } from 'date-fns'
import React, { useContext, useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { formattedPrice, imgBlur } from '@assets/utils'
import { appContext } from '@components/Context/context'

import { Button } from '_ui/Button'

import type { CourseCatalogItemProps } from './CourseCatalogItem.props'

const CourseInviteModal = dynamic(() => import('_modals/CourseInviteModal').then((mod) => mod.CourseInviteModal))
const ProfileInfoModal = dynamic(() => import('_modals/ProfileInfoModal').then((mod) => mod.ProfileInfoModal))

export function CourseCatalogItem({ ...props }: CourseCatalogItemProps) {
  const { profile } = useContext(appContext)
  const isStudent = profile?.role === 2

  const [isShowInviteModal, setIsShowInviteModal] = useState(false)
  const [isShowTeacherId, setIsShowTeacherId] = useState('')

  const handleAddToBasket = () => {
    if (isStudent) {
      setIsShowInviteModal(true)
    }
  }

  return (
    <div className={'courses-catalog__element'}>
      <div className="courses-catalog__box">
        {props.categories_repr?.map((category, i) => (
          <ul
            key={`${i}${category}`}
            className={'courses-catalog__tag'}
          >
            <li>{category}</li>
          </ul>
        ))}
        <span className={'courses-catalog__lesson courses-catalog__review--decor'}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#material"></use>
          </svg>
          {props.number_of_lectures} занять
        </span>
        <span className={'courses-catalog__review courses-catalog__review--decor '}>
          <svg className={'courses-catalog__svg'}>
            <use href="/img/sprite.svg#star"></use>
          </svg>
          {props.rating}
        </span>
        <span className={'courses-catalog__like'}>
          <svg>
            <use href="/img/sprite.svg#course-catalog-like"></use>
          </svg>
        </span>
        <div className={'courses-catalog__photo'}>
          <Link href={`/courses/${props.id}`}>
            <Image
              src={props.cover}
              width={640}
              height={360}
              style={{ objectFit: 'cover' }}
              alt={props.title}
              {...imgBlur}
            />
          </Link>
        </div>
      </div>
      <div
        className={'courses-catalog__info'}
        style={{ backgroundColor: props.color }}
      >
        <Link
          className={'courses-catalog__info-title'}
          href={`/courses/${props.id}`}
        >
          {props.title}
        </Link>
        <div className={'courses-catalog__teachers'}>
          {props.lectors.map((lecturer) => (
            <div
              key={lecturer.id}
              className={'courses-catalog__teacher'}
            >
              <div className={'courses-catalog__teacher-img'}>
                <Image
                  src={lecturer.avatar || '/img/static/default-avatar.png'}
                  width={20}
                  height={20}
                  style={{ objectFit: 'cover' }}
                  alt={`${lecturer.first_name} ${lecturer.last_name}`}
                />
              </div>
              <button onClick={() => setIsShowTeacherId(lecturer.id)}>{`${lecturer.last_name} ${lecturer.first_name[0]}. ${lecturer.patronymic[0]}.`}</button>
            </div>
          ))}
        </div>
        <div className={'courses-catalog__conditions'}>
          <div className={'courses-catalog__data'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>{' '}
            </svg>
            <p>
              старт - <span>{format(new Date(props.start_date), 'dd.MM.yyyy')}</span>
            </p>
          </div>
          <div className={'courses-catalog__persons'}>
            <svg className={'courses-catalog__svg courses-catalog__svg-stroke'}>
              <use href="/img/sprite.svg#person"></use>{' '}
            </svg>
            {!!props.max_number_of_students ? (
              <p>
                вільних:{' '}
                <span>
                  {props.max_number_of_students - props.number_of_students} з {props.max_number_of_students}
                </span>
              </p>
            ) : (
              <p>необмежено</p>
            )}
          </div>
        </div>
      </div>
      <div className={'courses-catalog__price'}>
        <div className={'courses-catalog__cost'}>
          {!!props.discount && (
            <s className={'courses-catalog__cost-discount'}>
              <span>{props.discount} грн.</span>
            </s>
          )}
          <p>{!!props.price ? `${formattedPrice(props.price)} грн.` : 'Безкоштовно'}</p>
        </div>
        <Button
          className={'some_button courses-catalog__btn'}
          onClick={handleAddToBasket}
        >
          <svg className="courses-catalog__svg courses-catalog__svg-rocket ">
            <use href={`/img/sprite.svg#${props.price ? 'basket-course' : 'cours'}`}></use>
          </svg>
          {props.price ? 'Додати в кошик' : 'Отримати'}
        </Button>
      </div>
      {isShowInviteModal && <CourseInviteModal onClose={() => setIsShowInviteModal(false)} />}
      {!!isShowTeacherId?.length && (
        <ProfileInfoModal
          teacherId={isShowTeacherId}
          onClose={() => setIsShowTeacherId('')}
        />
      )}
    </div>
  )
}

export function CourseCardPaid() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={'courses-catalog__element'}>
      <div className="courses-catalog__box">
        <span className={'courses-catalog__tag'}>Програми</span>
        <span className={'courses-catalog__lesson courses-catalog__review--decor '}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#material"></use>{' '}
          </svg>
          25 занять
        </span>
        <span className={'courses-catalog__review courses-catalog__review--decor '}>
          <svg className={'courses-catalog__svg'}>
            <use href="/img/sprite.svg#star"></use>
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

export function CourseCardPaidPromotion() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={'courses-catalog__element'}>
      <div className="courses-catalog__box">
        <span className={'courses-catalog__tag'}>Програми</span>
        <span className={'courses-catalog__lesson courses-catalog__review--decor'}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#material"></use>{' '}
          </svg>
          25 занять
        </span>
        <span className={'courses-catalog__review courses-catalog__review--decor'}>
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
          <s className={'courses-catalog__cost-discount'}>
            <span>6800</span>
          </s>
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

export function CourseCardFree() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className={'courses-catalog__element'}>
      <div className="courses-catalog__box">
        <span className={'courses-catalog__tag'}>ІТ</span>
        <span className={'courses-catalog__lesson courses-catalog__review--decor '}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#material"></use>{' '}
          </svg>
          25 занять
        </span>
        <span className={'courses-catalog__review courses-catalog__review--decor '}>
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
