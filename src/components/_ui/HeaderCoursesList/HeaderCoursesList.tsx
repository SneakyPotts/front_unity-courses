import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import SimpleBar from 'simplebar-react'
import { useOnClickOutside } from 'usehooks-ts'

import type { TSimpleCourse } from '@http/teacher/types'

import type { HeaderCoursesListProps } from './HeaderCoursesList.props'

export function HeaderCoursesList({ courses, current, handler }: HeaderCoursesListProps) {
  const wrapper = useRef<HTMLDivElement>(null)

  const [isShow, setIsShow] = useState(false)

  const [referenceElement, setReferenceElement] = useState<any>(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{ name: 'offset', options: { offset: [0, -1] } }],
  })

  const handleChange = (course: TSimpleCourse) => {
    handler(course)
    setIsShow(false)
  }

  useOnClickOutside(wrapper, () => setIsShow(false))

  return (
    <div
      ref={wrapper}
      className={classNames('header__dropdown', { 'select--active': isShow })}
    >
      <button
        ref={setReferenceElement}
        className="header__dropdown-btn"
        onClick={() => setIsShow((p) => !p)}
      >
        <svg className="btn__icon">
          <use href="/img/sprite.svg#cours"></use>
        </svg>
        Курси
        <svg className="select__top-svg">
          <use href="/img/sprite.svg#dropdown-arrow"></use>
        </svg>
      </button>
      {isShow && (
        <div
          ref={setPopperElement}
          className="header__dropdown-inner"
          {...attributes.popper}
          style={styles.popper}
        >
          <SimpleBar style={{ maxHeight: 220 }}>
            <ul className="header__dropdown-list">
              <li className="header__dropdown-item --title">Активні</li>
              {courses?.map((course) => (
                <li
                  key={course.id}
                  className={classNames('header__dropdown-item', { '--active': course.id === current?.id })}
                  onClick={() => handleChange(course)}
                >
                  {course.title}
                </li>
              ))}
            </ul>
          </SimpleBar>
        </div>
      )}
    </div>
  )
}
