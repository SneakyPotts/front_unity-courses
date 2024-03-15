import React from 'react'
import SimpleBar from 'simplebar-react'

import { Button } from '_ui/Button'

import type { CoursesProgressProps } from './CoursesProgress.props'

const coursesProgressData = [
  {
    id: '1q',
    link: '#',
    title: 'Основи образотворчого мистецтва для підлітків',
    image: 'https://picsum.photos/200/300?random=8',
    progress: 80,
  },
  {
    id: '1w',
    link: '#',
    title: 'TypeScript с нуля - полный курс и паттерны проектирования',
    image: 'https://picsum.photos/200/300?random=7',
    progress: 20,
  },
  {
    id: '1e',
    link: '#',
    title: 'Mastering TypeScript - 2023 Edition',
    image: 'https://picsum.photos/200/300?random=6',
    progress: 98,
  },
  {
    id: '1r',
    link: '#',
    title: 'Vue JS 3 Modern Web Development with Vuex & Vue Router',
    image: 'https://picsum.photos/200/300?random=5',
    progress: 60,
  },
  {
    id: '1t',
    link: '#',
    title: 'Java (Джава) для начинающих: с нуля до сертификата Oracle',
    image: 'https://picsum.photos/200/300?random=4',
    progress: 55,
  },
]

const CoursesProgressItem = ({ link, title, image, progress }: { link: string; title: string; image: string; progress: number }) => (
  <li className="statistics-block__course">
    <a
      href={link}
      className="course-progress"
    >
      <div className="course-progress__image">
        <img
          src={image}
          alt={title}
        />
      </div>
      <div className="course-progress__info">
        <h3 className="course-progress__title">{title}</h3>
        <div className="course-progress__progress progress">
          <span className="progress-line">
            <span style={{ width: `${progress}%` }}></span>
          </span>
          80%
        </div>
      </div>
    </a>
  </li>
)

export function CoursesProgress({ listCourses }: CoursesProgressProps) {
  return (
    <div
      className="statistics__block statistics-block statistics-block--progress"
      data-tab-content="Прогрес курсів"
    >
      <div className="statistics-block__top">
        <h2 className="statistics-block__title">Прогрес курсів</h2>

        {/*TODO: wait Courses from back-end*/}
        {/*<CustomLink*/}
        {/*  className="statistics-block__link link"*/}
        {/*  href={'#'}*/}
        {/*>*/}
        {/*  До моїх курсів*/}
        {/*  <svg>*/}
        {/*    <use href="/img/sprite.svg#arrow-right"></use>*/}
        {/*  </svg>*/}
        {/*</CustomLink>*/}
      </div>
      <div className="statistics-block__bottom">
        {!listCourses && (
          <div className="statistics-block__empty">
            <div className="statistics-block__image">
              <img
                src="/img/static/empty-courses.svg"
                alt="tip"
              />
            </div>
            <div className="statistics-block__info">
              <h3>
                Відкрий двері до знань! <br />
                Обери свій курс в нашій базі
              </h3>

              <Button
                variant={'border'}
                className="statistics-block__show-all"
                href="/"
              >
                До бази курсів
                <svg>
                  <use href="/img/sprite.svg#arrow-right"></use>
                </svg>
              </Button>
            </div>
          </div>
        )}

        {listCourses?.length && (
          <SimpleBar className="statistics-block__wrapper">
            <ul className="statistics-block__courses">
              {coursesProgressData.map((item) => (
                <CoursesProgressItem
                  key={item.id}
                  {...item}
                />
              ))}
            </ul>
          </SimpleBar>
        )}
      </div>
    </div>
  )
}
