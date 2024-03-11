import Image from 'next/image'

import { imgBlur } from '@assets/utils'

export default function CourseDetail() {
  return (
    <div className="content">
      <div className="content__container container">
        <section className={'courses-lesson'}>
          <div className={'courses-lesson__inner'}>
            <div className={'subject__left'}>
              <div className={' subject-card--blue my-catalog__block'}>
                <div className="my-catalog__left">
                  <h3 className={'my-catalog__left-title'}>Образотворче мистецтво для 10-11 класів</h3>
                  <p className={'my-catalog__left-text'}>
                    Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять
                    до навчання з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні
                    аспекти мистецтва та надають можливість долучитися до творчих завдань.
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
                        <Image
                          src="https://loremflickr.com/640/360"
                          style={{ objectFit: 'cover' }}
                          alt="alt"
                          width={640}
                          height={360}
                          {...imgBlur}
                        />
                      </div>
                      <button className={'my-catalog__item-name'}>Мітрошина Г. О.</button>
                    </div>
                  </div>
                  <div className={'my-catalog__contact close'}>
                    <button
                      className={'my-catalog__contact-btn'}
                      // onClick={changeStateTeacherBlock}
                    >
                      <svg className={'my-catalog__contact-svg'}>
                        <use href="/img/sprite.svg#arrow-top"></use>
                      </svg>
                    </button>
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
                    <Image
                      src="https://loremflickr.com/100/100"
                      style={{ objectFit: 'cover' }}
                      alt="alt"
                      width={100}
                      height={100}
                      {...imgBlur}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={'subject__right course-detail__ridth--element'}>
              <div className={'course-detail__block'}>
                <div className="lesson-section__container">
                  <div className={'teacher-card  teacher-card--big lesson-section__card-card'}>
                    <div className={'teacher-card__top'}>
                      <span className={'courses-lesson__span'}>
                        <svg>
                          <use href="/img/sprite.svg#star-strok"></use>
                        </svg>
                      </span>
                      <div className={'teacher-card__image'}>
                        <Image
                          src="https://loremflickr.com/640/360"
                          style={{ objectFit: 'cover' }}
                          alt="alt"
                          width={640}
                          height={360}
                          {...imgBlur}
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
                        <Image
                          src="https://loremflickr.com/640/360"
                          style={{ objectFit: 'cover' }}
                          alt="alt"
                          width={640}
                          height={360}
                          {...imgBlur}
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
                <div className="subject__statistics-block statistics-block statistics-block--row">
                  <div className="statistics-block__top">
                    <h2 className="statistics-block__title">Статистика</h2>

                    <a
                      className={'reviews__shop-link statistics-block__link link'}
                      href="#"
                    >
                      Всі курсу
                      <svg className={'reviews__arrow-svg reviews__arrow--active'}>
                        <use href="/img/sprite.svg#arrow-ridth"></use>
                      </svg>
                    </a>
                  </div>
                  <div className="statistics-block__bottom">
                    <div className="statistics-block__list">
                      <div className="statistics-block__item rating-block">
                        <div className="rating-block__top">
                          <h3 className="rating-block__title">Відвідуваність на онлайн уроках</h3>
                        </div>
                        <div className="rating-block__bottom">
                          <div className="rating-block__left">
                            <svg className="rating-block__icon">
                              <use xlinkHref="/img/sprite.svg#webcam" />
                            </svg>
                          </div>
                          <div className="rating-block__right">
                            <span className="rating-block__mark">2</span>/2
                          </div>
                        </div>
                      </div>
                      <div className="statistics-block__item rating-block">
                        <div className="rating-block__top">
                          <h3 className="rating-block__title">Прогнозована оцінка</h3>
                        </div>
                        <div className="rating-block__bottom">
                          <div className="rating-block__left">
                            <svg className="rating-block__icon">
                              <use xlinkHref="/img/sprite.svg#statistics" />
                            </svg>
                          </div>
                          <div className="rating-block__right">
                            <span className="rating-block__mark">1</span>/12
                          </div>
                        </div>
                      </div>
                      <div className="statistics-block__item rating-block">
                        <div className="rating-block__top">
                          <h3 className="rating-block__title">Середня оцінка за урок</h3>
                        </div>
                        <div className="rating-block__bottom">
                          <div className="rating-block__left">
                            <svg className="rating-block__icon">
                              <use xlinkHref="/img/sprite.svg#book" />
                            </svg>
                          </div>
                          <div className="rating-block__right">
                            <span className="rating-block__mark">8</span>/12
                          </div>
                        </div>
                      </div>
                      <div className="statistics-block__item rating-block">
                        <div className="rating-block__top">
                          <h3 className="rating-block__title">Середня оцінка за Д/З</h3>
                        </div>
                        <div className="rating-block__bottom">
                          <div className="rating-block__left">
                            <svg className="rating-block__icon">
                              <use xlinkHref="/img/sprite.svg#home" />
                            </svg>
                          </div>
                          <div className="rating-block__right">
                            <span className="rating-block__mark">9</span>/12
                          </div>
                        </div>
                      </div>
                      <div className="statistics-block__item rating-block">
                        <div className="rating-block__top">
                          <h3 className="rating-block__title">Середня оцінка за С/Р</h3>
                        </div>
                        <div className="rating-block__bottom">
                          <div className="rating-block__left">
                            <svg className="rating-block__icon">
                              <use xlinkHref="/img/sprite.svg#pen" />
                            </svg>
                          </div>
                          <div className="rating-block__right">
                            <span className="rating-block__mark">3</span>/12
                          </div>
                        </div>
                      </div>
                      <div className="statistics-block__item rating-block">
                        <div className="rating-block__top">
                          <h3 className="rating-block__title">Середня оцінка за Тести</h3>
                        </div>
                        <div className="rating-block__bottom">
                          <div className="rating-block__left">
                            <svg className="rating-block__icon">
                              <use xlinkHref="/img/sprite.svg#test" />
                            </svg>
                          </div>
                          <div className="rating-block__right">
                            <span className="rating-block__mark">8</span>/12
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lesson-section__block course-detail__content--element">
              <div className="lesson-section__section">
                <h2 className={'lesson-section__title'}>Програма та графік</h2>
                тут будет список занятий
              </div>
              <div className="lesson-section__section">
                <h2 className="lesson-section__title">Матеріали курсу:</h2>
                <div className="lesson-section__document-block document-block">
                  <ul className="document-block__list">
                    <li className="document-block__item document">
                      <div className="document__wrapper">
                        <a
                          href="https://s3.us-east-005.backblazeb2.com/unity-dev/0934aecc-b303-44c0-9411-457fe0b626ed/files/sample.pdf"
                          className="document__remove"
                          type="button"
                          aria-label="Завантажити цей документ"
                          download="https://s3.us-east-005.backblazeb2.com/unity-dev/0934aecc-b303-44c0-9411-457fe0b626ed/files/sample.pdf"
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
                        <span className="document__title">sample.pdf</span>
                      </div>
                    </li>
                    <li className="document-block__item document">
                      <div className="document__wrapper">
                        <a
                          href="https://s3.us-east-005.backblazeb2.com/unity-dev/0934aecc-b303-44c0-9411-457fe0b626ed/files/sample.pdf"
                          className="document__remove"
                          type="button"
                          aria-label="Завантажити цей документ"
                          download="https://s3.us-east-005.backblazeb2.com/unity-dev/0934aecc-b303-44c0-9411-457fe0b626ed/files/sample.pdf"
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
                        <span className="document__title">sample.pdf</span>
                      </div>
                    </li>
                    <li className="document-block__item document">
                      <div className="document__wrapper">
                        <a
                          href="https://s3.us-east-005.backblazeb2.com/unity-dev/0934aecc-b303-44c0-9411-457fe0b626ed/files/sample.pdf"
                          className="document__remove"
                          type="button"
                          aria-label="Завантажити цей документ"
                          download="https://s3.us-east-005.backblazeb2.com/unity-dev/0934aecc-b303-44c0-9411-457fe0b626ed/files/sample.pdf"
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
                        <span className="document__title">sample.pdf</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="lesson-section__section">
                <h2 className="lesson-section__title">Додаткові посилання:</h2>
                <ul className="lesson-section__links">
                  <li className="lesson-section__unit">
                    <a
                      href="#"
                      className="lesson-section__link"
                    >
                      <svg>
                        <use xlinkHref="img/sprite.svg#link" />
                      </svg>
                      <span> https://www.houseofmath.com/uk/flk; lfkjq; kl; k;</span>
                    </a>
                    <p className="lesson-section__description">
                      Множини чисел так вiдносяться одна до&nbsp;одної: множина натуральних чисел ℕ включена до множини цiлих чисел ℤ.
                    </p>
                  </li>
                  <li className="lesson-section__unit">
                    <a
                      href="#"
                      className="lesson-section__link"
                    >
                      <svg>
                        <use xlinkHref="img/sprite.svg#link" />
                      </svg>
                      <span> https://uk.economy-pedia.com/11040408-numeric-sets</span>
                    </a>
                    <p className="lesson-section__description">
                      Множини чисел так вiдносяться одна до&nbsp;одної: множина натуральних чисел ℕ включена до множини цiлих чисел ℤ, яка, своєю чергою, включена
                      до&nbsp;множини рацiональних чисел ℚ, а&nbsp;та, нарештi, включена до&nbsp;множини дiйсних чисел ℝ.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
