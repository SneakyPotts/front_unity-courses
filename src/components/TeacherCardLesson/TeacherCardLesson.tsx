import React from 'react'

import Image from 'next/image'

import { TTeacher } from '@/assets/types/globals'

import { TeacherForCourse } from '../_ui/TeacherForCourse'
import type { TeacherCardLessonProps } from './TeacherCardLesson.props'

export const lector: TTeacher = {
  first_name: 'Марія',
  last_name: 'Іванівна',
  patronymic: 'Петрова',
  avatar: 'https://loremflickr.com/640/360',
  id: 'asd',
}

export function TeacherCardLesson({}: TeacherCardLessonProps) {
  return (
    <div className={'teacher-case'}>
      <div className={'teacher-case__head'}>
        <h3 className={'teacher-case__head-subtitle'}>
          <span>1.</span>
          шаблон
        </h3>
        <button className={'teacher-case__head-btn'}>
          <svg>
            <use href="/img/sprite.svg#pensil"></use>
          </svg>
          Редагувати
        </button>
      </div>
      <div className={'teacher-case__content'}>
        <div className={'teacher-case__box teacher-case__box--left'}>
          <div className={'teacher-case__info'}>
            <h2 className={'teacher-case__title'}> Вступ до мови програмування Python</h2>
            <p className={'teacher-case__info-text'}>
              Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять до
              навчання з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні аспекти
              мистецтва та надають можливість долучитися до творчих завдань.
            </p>
          </div>

          <div className={'teacher-case__container'}>
            <ul className={'teacher-case__list'}>
              <li>
                <div className={'teacher-case__elements'}>
                  <div className={'teacher-case__elements-element teacher-case__elements--unique'}>
                    <svg>
                      <use href="/img/sprite.svg#camera"></use>
                    </svg>
                    <p>Заняття проводяться з викладачем у live режимі (НЕ відео-запис)</p>
                  </div>
                  <div className={'teacher-case__elements-element teacher-case__elements--unique'}>
                    <svg>
                      <use href="/img/sprite.svg#clock"></use>
                    </svg>
                    <p>Заняття проводяться самостійно</p>
                  </div>
                </div>
              </li>
              <li>
                <div className={'teacher-case__elements'}>
                  <div className={'teacher-case__elements-element'}>
                    <svg>
                      <use href="/img/sprite.svg#clock"></use>
                    </svg>
                    <p>курс дійсний:</p>
                    <span>Чекає на заповнення</span>
                  </div>
                  <div className={'teacher-case__elements-element'}>
                    <svg>
                      <use href="/img/sprite.svg#clock"></use>
                    </svg>
                    <p>курс дійсний:</p>
                    <span>Чекає на заповнення</span>
                  </div>
                </div>
              </li>
              <li>
                <div className={'teacher-case__elements'}>
                  <div className={'teacher-case__elements-element'}>
                    <svg>
                      <use href="/img/sprite.svg#clock"></use>
                    </svg>
                    <p>курс дійсний:</p>
                    <span>Чекає на заповнення</span>
                  </div>
                  <div className={'teacher-case__elements-element teacher-case__elements--svg'}>
                    <svg className={'teacher-case__elements--svg'}>
                      <use href="/img/sprite.svg#person"></use>
                    </svg>
                    <p>цільова аудиторія:</p>
                    <span>6-8 клас</span>
                    <span>9-11 клас</span>
                  </div>
                </div>
              </li>
              <li>
                <div className={'teacher-case__elements'}>
                  <div className={'teacher-case__elements-element'}>
                    <svg>
                      <use href="/img/sprite.svg#list"></use>
                    </svg>
                    <span>5 тем</span>
                  </div>
                  <div className={'teacher-case__elements-element'}>
                    <svg>
                      <use href="/img/sprite.svg#list"></use>
                    </svg>
                    <span>5 тем</span>
                  </div>
                  <TeacherForCourse lecturer={lector} />
                  <TeacherForCourse lecturer={lector} />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={'teacher-case__box teacher-case__box--ridth'}>
          <div className="teacher-case__img">
            <Image
              src={'https://loremflickr.com/640/360'}
              width={400}
              height={200}
              style={{ objectFit: 'cover', borderRadius: 5 }}
              alt=""
            />
          </div>
          <div className={'teacher-case__module'}>
            <div className={'teacher-case__participants'}>
              <svg>
                <use href="/img/sprite.svg#man"></use>
              </svg>
              <svg>
                <use href="/img/sprite.svg#woman"></use>
              </svg>
              <p className={'teacher-case__participants-text'}>кількість учнів:</p>
              <div className={'teacher-case__counter'}>
                <span className={'teacher-case__counter-limited close'}>30</span>

                <span className={'teacher-case__counter-unlimited '}>
                  <svg>
                    <use href="/img/sprite.svg#infinity"></use>
                  </svg>
                </span>
                <span className={'teacher-case__counter-text close'}>Чекає на заповнення</span>
              </div>
            </div>
            <div className={'teacher-case__price'}>5 300 грн.</div>
          </div>
        </div>
      </div>
      <div className={'teacher-case__buttons'}>
        <button className={'teacher-case__buttons-arrow'}>
          <svg>
            <use href="/img/sprite.svg#arrow-bottom"></use>
          </svg>
        </button>
        <button className={'btn teacher-case__buttons-btn btn--trans'}>відмінити модерацію</button>
      </div>
    </div>
  )
}
