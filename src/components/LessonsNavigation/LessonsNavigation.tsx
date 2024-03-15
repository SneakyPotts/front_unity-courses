import classNames from 'classnames'
import React from 'react'
import SimpleBar from 'simplebar-react'
import { useToggle } from 'usehooks-ts'

import { useParams, useRouter } from 'next/navigation'

import { Portal } from '@components/Portal'
import { useBlockScroll } from '@hooks/useBlockScroll'
import { useQueryCourses } from '@http/courses/client'

import { Loader } from '_ui/Loader'

import type { LessonsNavigationAccordionProps, LessonsNavigationProps } from './LessonsNavigation.props'

function Accordion({ orderNum, onClose, ...topic }: LessonsNavigationAccordionProps) {
  const params = useParams()
  const router = useRouter()

  const [isActive, toggleActive] = useToggle(!!topic.lectures.find((i) => i.id === params.lesson_id))

  const handleClick = (lessonId: string) => {
    router.push(`/lessons/${lessonId}`)
    onClose()
  }

  return (
    <li className={classNames('maintenance__item', { 'maintenance__item--active': isActive })}>
      <button
        className="maintenance__btn"
        aria-expanded={isActive}
        aria-label="Відкрити розділ"
        onClick={toggleActive}
      >
        {/* <span className="maintenance__btn-num"></span> */}
        {orderNum} {topic.title}
        <div className="maintenance__icon">
          <svg className="maintenance__icon-svg">
            <use href="/img/sprite.svg#arrow-down-mini"></use>
          </svg>
        </div>
      </button>
      <div className={classNames('maintenance__block', { '--open': isActive })}>
        <ol className="maintenance__sublist">
          {!!topic.lectures.length ? (
            topic.lectures.map((v, index) => (
              <li
                key={v.id}
                className="maintenance__subitem"
              >
                <span
                  onClick={() => handleClick(v.id)}
                  className={classNames('maintenance__link', {
                    'maintenance__link--disable': !!0,
                    'maintenance__link--active': v.id === params.lesson_id,
                  })}
                >
                  {/* <span className="maintenance__btn-num"></span> */}
                  {orderNum}.{index + 1} {v.title}
                </span>
              </li>
            ))
          ) : (
            <li className="maintenance__subitem">
              <span className="maintenance__link">Lessons is coming soon...</span>
            </li>
          )}
        </ol>
      </div>
    </li>
  )
}

export function LessonsNavigation({ courseId, onClose }: LessonsNavigationProps) {
  const {
    program: { data, isLoading, isError },
  } = useQueryCourses({ course_id: courseId })

  useBlockScroll()

  return (
    <Portal>
      <div
        className={classNames('maintenance', 'maintenance--open')}
        onClick={onClose}
      >
        <div
          className="maintenance__content"
          onClick={(ev) => ev.stopPropagation()}
        >
          <div className="maintenance__top">
            <h2 className="maintenance__title">{isLoading ? 'Завантаження...' : data?.title}</h2>
            <button
              className="maintenance__close"
              aria-label="Закрити зміст"
              onClick={onClose}
            >
              <svg className="maintenance__close-svg">
                <use href="/img/sprite.svg#close"></use>
              </svg>
            </button>
          </div>

          <SimpleBar
            className="maintenance__bottom"
            style={{ maxHeight: 'calc(100vh - 85px)' }}
          >
            {isLoading && <Loader />}
            {isError && <p className="text-center">Щось пішло не так...</p>}
            {!!data?.topics?.length && (
              <ol className="maintenance__list">
                {data.topics.map((v, i) => (
                  <Accordion
                    key={v.id}
                    orderNum={i + 1}
                    onClose={onClose}
                    {...v}
                  />
                ))}
                {/* <li className="maintenance__item">
                  <button className="maintenance__btn">Контрольна робота за І семестр</button>
                </li> */}
              </ol>
            )}
          </SimpleBar>
        </div>
      </div>
    </Portal>
  )
}
