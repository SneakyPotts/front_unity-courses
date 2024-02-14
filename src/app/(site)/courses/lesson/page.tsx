'use client'

import { useState } from 'react'

import { Tabs } from '@UI/Tabs'

const tabs = ['Конспект', 'Самостійна робота', 'Тест']

export default function CourseLesson() {
  return (
    <div className="content">
      <div className={'content__container container'}>
        <section className={'courses-lesson'}>
          <div className={'courses-lesson__inner'}>
            <div className={'theme-card lesson-section__theme subject-card--purple'}>
              <div className={'theme-card__inner courses-lesson__block--element'}>
                <div className={'theme-card__top'}>Вступ до мови програмування Python</div>
                <h1 className={'theme-card__title courses-lesson__title--element'}>
                  Тема: Синтаксис, змінні, цикли, функції, оператори, списки та інші базові конструкції мови Python.
                </h1>
                <div className={'courses-lesson__data my-catalog__condition--violet'}>
                  <svg className="archive__data-svg">
                    <use xlinkHref="/img/sprite.svg#clock" />
                  </svg>
                  <p>початок заняття - 10 грудня 16:00</p>
                </div>

                <div className="courses-lesson__img">
                  <img
                    src="https://picsum.photos/65/65"
                    alt="Icon"
                  />
                </div>
              </div>
              <button
                className="theme-card__more"
                aria-expanded="false"
                aria-label="Відкрити інформацію про предмет"
              >
                <svg className="theme-card__more-svg">
                  <use xlinkHref="/img/sprite.svg#arrow-down-mini" />
                </svg>
              </button>
              <div className="theme-card__info" />
            </div>
            <div
              className="lesson-section__right courses-lesson__right--element"
              style={{ maxHeight: 0 }}
            >
              <div className="lesson-section__container">
                <div className={'teacher-card my-catalog__callback-subject teacher-card--big lesson-section__card-card'}>
                  <div className={'teacher-card__top'}>
                    <span className={'courses-lesson__span'}>
                      <svg>
                        <use href="/img/sprite.svg#star-strok"></use>
                      </svg>
                    </span>
                    <div className={'teacher-card__image'}>
                      <img
                        src="https://loremflickr.com/640/360"
                        alt="фотография профиля"
                      />
                    </div>
                    <div className={'teacher-card__info'}>
                      <div className={'teacher-card__name'}>Кайдаш Людмила Миколаївна</div>
                      <div className={'courses-lesson__job teacher-card__status'}>Викладач математики, алгебри, геометрії</div>
                    </div>
                  </div>
                  <button className={'teacher-card__question'}>
                    <svg className={'teacher-card__question-svg'}>
                      <use href="/img/sprite.svg#message"></use>
                    </svg>
                    Задати питання
                  </button>
                </div>
                <div className={'teacher-card teacher-card--big'}>
                  <div className={'teacher-card__top'}>
                    <div className={'teacher-card__image'}>
                      <img
                        src="https://loremflickr.com/640/360"
                        alt="фотография профиля"
                      />
                    </div>
                    <div className={'teacher-card__info'}>
                      <div className={'teacher-card__name'}>Кайдаш Людмила Миколаївна</div>
                      <div className={'courses-lesson__job teacher-card__status'}>Викладач математики, алгебри, геометрії</div>
                    </div>
                  </div>
                  <button className={'teacher-card__question'}>
                    <svg className={'teacher-card__question-svg'}>
                      <use href="/img/sprite.svg#message"></use>
                    </svg>
                    Задати питання
                  </button>
                </div>
              </div>
            </div>
            <ContentTabs />
          </div>
        </section>
        <div></div>
      </div>
    </div>
  )
}

function ContentTabs() {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <>
      <Tabs
        className={'add-here-some-className-Artem'}
        list={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSmall
      />
      {activeTab === 1 && <ConspectTab />}
      {activeTab === 2 && <ControlWorkTab />}
      {activeTab === 3 && <IndividualWorkTab />}
      {activeTab === 4 && <TestWorkTab />}
    </>
  )
}

function ConspectTab() {
  return (
    <div className={'courses-lesson__body'}>
      <div className="lesson-section__text">
        <h3>Подивіться відео</h3>
        <div className="courses-lesson__video">
          <iframe
            width="100%"
            height="554"
            src="https://www.youtube.com/embed/jfKfPfyJRdk?si=OQN7PBjm6_zckxEs"
            title="YouTube video player"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            // allowfullscreen
          ></iframe>
        </div>
        <div className="text-wrapp">
          <p>
            Всі числа можна віднести до тієї чи іншої групи, об’єднуючи їх за певними ознаками та властивостями. <br />
            Найпростішою та найзрозумілішою множиною чисел є натуральні числа.
          </p>
          <img
            src="https://loremflickr.com/640/360"
            alt=""
          />
          <h3>Означення</h3>
          <div className="definition">
            <strong>Натуральнi числа</strong> — це числа, якi виникають природним чином при лiчбi предметiв.
          </div>
          <p>
            Наприклад: 1,2,3,4…
            <br />
            Числовi множини прийнято позначати латинськими великими лiтерами. <br />
            Множину натуральних чисел позначають знаком N.
            <br />
          </p>
          <p>
            Наприклад: 1,2,3,4…
            <br />
            Числовi множини прийнято позначати латинськими великими лiтерами. <br />
            Множину натуральних чисел позначають знаком N.
            <br />
          </p>
          <h3>Означення</h3>
          <div className="definition">
            <strong>Цiлi числа</strong> — множина, що складається з множини натуральних чисел, нуля, та множини вiд’ємних чисел (є протилежними до натуральних).
          </div>
          <p>
            Наприклад: 1,2,3,4…
            <br />
            Числовi множини прийнято позначати латинськими великими лiтерами. <br />
            Множину натуральних чисел позначають знаком N.
            <br />
          </p>
          <h2>Взаємно однозначна відповідність між елементами множин</h2>

          <p>
            Всі числа можна віднести до тієї чи іншої групи, об’єднуючи їх за певними ознаками та властивостями. <br />
            Найпростішою та найзрозумілішою множиною чисел є натуральні числа.
          </p>
          <img
            src="https://loremflickr.com/640/360"
            alt=""
          />
          <h3>Означення</h3>
          <div className="definition">
            <strong>Натуральнi числа</strong> — це числа, якi виникають природним чином при лiчбi предметiв.
          </div>
          <p>
            Наприклад: 1,2,3,4…
            <br />
            Числовi множини прийнято позначати латинськими великими лiтерами. <br />
            Множину натуральних чисел позначають знаком N.
            <br />
          </p>
        </div>
      </div>
    </div>
  )
}

function ControlWorkTab() {
  return (
    <div>
      <h1>Самостійна робота</h1>
    </div>
  )
}

function IndividualWorkTab() {
  return (
    <div>
      <h1>Some Individual Work for lesson</h1>
    </div>
  )
}

function TestWorkTab() {
  return (
    <div>
      <h1>Тест</h1>
    </div>
  )
}
