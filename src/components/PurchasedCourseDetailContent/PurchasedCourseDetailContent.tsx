'use client'

import React from 'react'

import { ScheduleSection } from '_content/CourseDetailContent/components/ScheduleSection'

import type { PurchasedCourseDetailContentProps } from './PurchasedCourseDetailContent.props'

export function PurchasedCourseDetailContent({ data }: PurchasedCourseDetailContentProps) {
  return (
    <div className="lesson-section__block course-detail__content--element">
      <div className="lesson-section__section">
        <ScheduleSection
          titleClass="lesson-section__title"
          courseId={data?.id}
          topics={data?.topics}
          courseFree
        />
      </div>
      {!!data?.materials.length && (
        <div className="lesson-section__section">
          <h2 className="lesson-section__title">Матеріали курсу:</h2>

          <div className="lesson-section__document-block document-block">
            <ul className="document-block__list">
              {data?.materials?.map((material, i) => (
                <li
                  key={material.id}
                  className="document-block__item document"
                >
                  <div className="document__wrapper">
                    <a
                      href={material.file}
                      className="document__remove"
                      type="button"
                      aria-label="Завантажити цей документ"
                      download={material.file}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg className="document__remove-svg">
                        <use xlinkHref="/img/sprite.svg#download-file" />
                      </svg>
                    </a>
                    <div className="document__preview">
                      <svg className="document__image">
                        <use href="/img/sprite.svg#avatar-image" />
                      </svg>
                    </div>
                    <span className="document__title">{material.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {!!data?.links.length && (
        <div className="lesson-section__section">
          <h2 className="lesson-section__title">Додаткові посилання:</h2>
          <ul className="lesson-section__links">
            {data?.links.map((v) => (
              <li
                key={v.id}
                className="lesson-section__unit"
              >
                <a
                  href={v.link}
                  className="lesson-section__link"
                >
                  <svg>
                    <use xlinkHref="img/sprite.svg#link" />
                  </svg>
                  <span>{v.link}</span>
                </a>
                <p className="lesson-section__description">{v.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
