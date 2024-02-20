'use client'

import { Button } from '_ui/Button'
import { MyCoursesEmpty } from '_ui/MyCoursesEmpty'

export default function CoursesMyCatalog() {
  if (!0) return <MyCoursesEmpty />

  return (
    <div className="content">
      <div className="content__container container">
        <section className={'my-catalog'}>
          <div className={'my-catalog__inner'}>
            <div className={'my-catalog__courses'}>
              <h2 className={'my-catalog__title'}>Активні</h2>
              <div className={'my-catalog__active'}>
                <CourseCardViolet />
                <CourseCardPurple />
              </div>
              <h2 className={'my-catalog__title'}>Завершені</h2>
              <div className={'my-catalog__element'}>
                <CourseReview />
                <CourseGrade />
              </div>
            </div>
            <div className={'my-catalog__banner'}>
              <div className={'my-catalog__banner-box'}>{/*<Banner />*/}</div>
              <div className={'my-catalog__banner-box'}>{/*<Banner />*/}</div>
              <div className={'my-catalog__banner-box'}>{/*<Banner />*/}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function CourseCardViolet() {
  return (
    <div className={'subject-card--purple my-catalog__block'}>
      <div className="my-catalog__left">
        <h3 className={'my-catalog__left-title'}>
          Вступ до мови програмування Python Вступ до мови програмування Python Вступ до мови програмування Python Вступ до мови програмування Python
        </h3>
        <p className={'my-catalog__left-text'}>
          Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять до
          навчання з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні аспекти мистецтва
          та надають можливість долучитися до творчих завдань.
        </p>
        <div className="my-catalog__condition my-catalog__condition--violet">
          <svg className={'courses-catalog__svg courses-catalog__svg-stroke'}>
            <use href="/img/sprite.svg#learn"></use>{' '}
          </svg>
          <p>самостійне навчання</p>
        </div>
        <div className="my-catalog__box">
          <div className={'my-catalog__item'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#material"></use>{' '}
            </svg>
            <p>5 місяців</p>
          </div>
          <div className={'my-catalog__item'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#calendar"></use>{' '}
            </svg>
            <p>25 занять</p>
          </div>
          <div className={'my-catalog__item'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>{' '}
            </svg>
            <p>50 годин</p>
          </div>
          <div className={'my-catalog__item my-catalog__teacher'}>
            <div className={'courses-catalog__teacher-img'}>
              <img
                src="https://loremflickr.com/640/360"
                alt="аватарка акаунта"
              />
            </div>
            <button className={'my-catalog__item-name'}>Мітрошина Г. О.</button>
          </div>
        </div>
        <div className={'my-catalog__contact close'}>
          <button className={'my-catalog__contact-btn'}>
            <svg className={'my-catalog__contact-svg'}>
              <use href="/img/sprite.svg#arrow-bottom"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={'my-catalog__ridth'}>
        <div className="my-catalog__ridth-time">
          <svg className={'nav__link-svg'}>
            <use href="/img/sprite.svg#clock"></use>{' '}
          </svg>
          <p>дійсний ще 25 днів</p>
        </div>
        <div className={'my-catalog__ridth-photo'}>
          <img
            src="https://loremflickr.com/640/360"
            alt="фото курсу"
          />
        </div>
      </div>
    </div>
  )
}

function CourseCardPurple() {
  return (
    <div className={' subject-card--blue my-catalog__block'}>
      <div className="my-catalog__left">
        <h3 className={'my-catalog__left-title'}>Образотворче мистецтво для 10-11 класів</h3>
        <p className={'my-catalog__left-text'}>
          Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять до
          навчання з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні аспекти мистецтва
          та надають можливість долучитися до творчих завдань.
        </p>
        <div className={'my-catalog__duration'}>
          <div className={'my-catalog__condition my-catalog__condition--violet'}>
            <svg className={'courses-catalog__svg courses-catalog__svg-stroke'}>
              <use href="/img/sprite.svg#learn"></use>
            </svg>
            <p>найближче заняття - 10 грудня 16:00</p>
          </div>
          <div className={'my-catalog__duration-item'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#camera"></use>
            </svg>
            <svg className={'courses-catalog__svg courses-catalog__svg-stroke'}>
              <use href="/img/sprite.svg#learn"></use>
            </svg>
          </div>
        </div>
        <div className="my-catalog__box">
          <div className={'my-catalog__item'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>{' '}
            </svg>
            <p>50 годин</p>
          </div>
          <div className={'my-catalog__item  my-catalog__teacher'}>
            <div className={'courses-catalog__teacher-img'}>
              <img
                src="https://loremflickr.com/640/360"
                alt="аватарка акаунта"
              />
            </div>
            <button className={'my-catalog__item-name'}>Мітрошина Г. О.</button>
          </div>
        </div>
        <div className={'my-catalog__contact close'}>
          <button className={'my-catalog__contact-btn'}>
            <svg className={'my-catalog__contact-svg'}>
              <use href="/img/sprite.svg#arrow-top"></use>
            </svg>
          </button>
          <div className={'my-catalog__callback'}>
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
            <div className={'teacher-card '}>
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
      </div>
      <div className={'my-catalog__ridth'}>
        <div className="my-catalog__ridth-time">
          <svg className={'nav__link-svg'}>
            <use href="/img/sprite.svg#clock"></use>{' '}
          </svg>
          <p>дійсний ще 105 днів</p>
        </div>
        <div className={'my-catalog__ridth-photo'}>
          <img
            src="https://picsum.photos/100/100"
            alt="фото курсу"
          />
        </div>
      </div>
    </div>
  )
}

//Courses completed
function CourseReview() {
  return (
    <div className={'subject-card--purple my-catalog__block'}>
      <div className="my-catalog__left">
        <h3 className={'my-catalog__left-title'}>Введення в Штучний Інтелект та Машинне Навчання</h3>
        <p className={'my-catalog__left-text'}>
          Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять до
          навчання з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні аспекти мистецтва
          та надають можливість долучитися до творчих завдань.
        </p>
        <div className="my-catalog__box">
          <div className={'my-catalog__item'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>{' '}
            </svg>
            <p>50 годин</p>
          </div>
          <div className={'my-catalog__item'}>
            <div className={'courses-catalog__teacher-img'}>
              <img
                src="https://loremflickr.com/640/360"
                alt="аватарка акаунта"
              />
            </div>
            <button className={'my-catalog__item-name'}>Мітрошина Г. О.</button>
          </div>
        </div>
      </div>
      <div className={'my-catalog__ridth'}>
        <Button className={' courses-catalog__btn  some_button my-catalog__review-btn'}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#message"></use>
          </svg>
          залишити відгук
        </Button>
        <div className={'my-catalog__ridth-photo'}>
          <img
            src="https://picsum.photos/100/100"
            alt="фото курсу"
          />
        </div>
      </div>
    </div>
  )
}
function CourseGrade() {
  return (
    <div className={'subject-card--green my-catalog__block'}>
      <div className="my-catalog__left">
        <h3 className={'my-catalog__left-title'}>Введення в Штучний Інтелект та Машинне Навчання</h3>
        <p className={'my-catalog__left-text'}>
          Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять до
          навчання з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні аспекти мистецтва
          та надають можливість долучитися до творчих завдань.
        </p>
        <div className="my-catalog__box">
          <div className={'my-catalog__item'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>{' '}
            </svg>
            <p>50 годин</p>
          </div>
          <div className={'my-catalog__item'}>
            <div className={'courses-catalog__teacher-img'}>
              <img
                src="https://loremflickr.com/640/360"
                alt="аватарка акаунта"
              />
            </div>
            <button className={'my-catalog__item-name'}>Мітрошина Г. О.</button>
          </div>
        </div>
      </div>
      <div className={'my-catalog__ridth'}>
        <div className={'reviews__ratings '}>
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
          <svg className={'archive__reviews-svg'}>
            <use href="/img/sprite.svg#star-strok"></use>
          </svg>
          <p className={'reviews__ratings-text'}>4.5</p>
        </div>
        <div className={'my-catalog__ridth-photo'}>
          <img
            src="https://picsum.photos/100/100"
            alt="фото курсу"
          />
        </div>
      </div>
    </div>
  )
}
