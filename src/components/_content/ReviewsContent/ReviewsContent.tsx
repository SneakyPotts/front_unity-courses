import React from 'react'

import { Button } from '_ui/Button'

import type { ReviewsContentProps } from './ReviewsContent.props'

export function ReviewsContent({}: ReviewsContentProps) {
  return (
    <section className={'reviews'}>
      <div className={'reviews__inner'}>
        <div className={' my-catalog__block subject-card--gray'}>
          <div className="my-catalog__left">
            <h1 className={'my-catalog__left-title'}>Введення в Штучний Інтелект та Машинне Навчання</h1>
            <p className={'my-catalog__left-text'}>
              Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять до
              навчання з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні аспекти
              мистецтва та надають можливість долучитися до творчих завдань.
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
                src="https://loremflickr.com/640/360"
                alt="фото курсу"
              />
            </div>
          </div>
        </div>
        <div className={'reviews__top'}>
          <div className={'reviews__ratings reviews__ratings--degree'}>
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
            <svg className="archive__reviews-svg">
              <use href="/img/sprite.svg#star"></use>
            </svg>
            <p className={'raviews__rating'}>4.5</p>
          </div>
          <p className={'reviews__top-text'}>Всього відгуків 407</p>
        </div>
        <div className={'reviews__block'}>
          <ReviewsAdd />
          <ReviewsDone />
          <ReviewsBlockClose />
          <ReviewsBlockOpen />
          <ReviewsBlockInfo />
          <ReviewsBlockDone />
          <div className={'reviews__paginations'}>
            <button className={'reviews__btn'}>
              <svg className="reviews__arrow-svg">
                <use href="/img/sprite.svg#arrow-left"></use>
              </svg>
            </button>
            <ul className={'courses-catalog__paginations-list'}>
              <li className={'courses-catalog__paginations-item courses-catalog__paginations--active'}>1</li>
              <li className={'courses-catalog__paginations-item'}>2</li>
              <li className={'courses-catalog__paginations-item'}>3</li>
              <li className={'courses-catalog__paginations-item'}>4</li>
              <li className={'courses-catalog__paginations-item'}>5</li>
              <li className={'courses-catalog__paginations-item'}>...</li>
              <li className={'courses-catalog__paginations-item'}>11</li>
            </ul>
            <button className={'reviews__btn'}>
              <svg className="reviews__arrow-svg reviews__arrow--active">
                <use href="/img/sprite.svg#arrow-ridth"></use>
              </svg>
            </button>
          </div>
          <div className={'reviews__shop'}>
            <h2 className={'reviews__shop-title'}>Ми рекомендуємо, буде цікаво</h2>
            <a
              className={'reviews__shop-link statistics-block__link link'}
              href="#"
            >
              Всі курсу
              <svg className="reviews__arrow-svg reviews__arrow--active">
                <use href="/img/sprite.svg#arrow-ridth"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// написание отзывы (его создание)
function ReviewsAdd() {
  return (
    <div className={'subject-card--blue reviews__box'}>
      <div className={'reviews__user'}>
        <div className={'archive__review-photo  reviews__user--photo'}>
          <img
            src="https://loremflickr.com/640/360"
            alt="фото профелю"
          />
        </div>
        <div className={'reviews__person'}>
          <p className={'reviews__name'}>Никітенко Андрій</p>
        </div>
        <div className={'reviews__ratings reviews__ratings--user'}>
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
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
        </div>
        <time
          className={'reviews__data'}
          dateTime={'12.09.2023'}
        >
          12.09.2023
        </time>
      </div>
      <div className={'reviews__content'}>
        {/* reviews__comments--open доп класс который даёт  отступ  когда поле для комментария  открыто */}
        <div className={'reviews__callback reviews__comments--open'}>
          тут будет тексоторый редакрот как в блоке с редактированием урока учителем (только меньше возможностей)
        </div>
        <Button
          className={'reviews__content--btn some_button'}
          disabled
        >
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#plus"></use>
          </svg>
          додати відгук
        </Button>
      </div>
    </div>
  )
}

// отзыв заполнен и можно отправить
function ReviewsDone() {
  return (
    <div className={'subject-card--blue reviews__box'}>
      <div className={'reviews__user'}>
        <div className={'archive__review-photo  reviews__user--photo'}>
          <img
            src="https://loremflickr.com/640/360"
            alt="фото профелю"
          />
        </div>
        <div className={'reviews__person'}>
          <p className={'reviews__name'}>Никітенко Андрій</p>
        </div>
        <div className={'reviews__ratings reviews__ratings--user'}>
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
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
        </div>
        <time
          className={'reviews__data'}
          dateTime={'12.09.2023'}
        >
          12.09.2023
        </time>
      </div>
      <div className={'reviews__content'}>
        {/* reviews__comments--open доп класс который даёт  отступ  когда поле для комментария  открыто */}
        <div className={'reviews__callback reviews__comments--open'}>
          тут будет тексоторый редакрот как в блоке с редактированием урока учителем (только меньше возможностей)
        </div>
        <Button className={'reviews__content--btn some_button'}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#plus"></use>
          </svg>
          додати Відповідь
        </Button>
      </div>
    </div>
  )
}

// отзыв в статике
function ReviewsBlockClose() {
  return (
    <div className={'subject-card--blue reviews__box'}>
      <div className={'reviews__user'}>
        <div className={'archive__review-photo reviews__user--photo'}>
          <img
            src="https://loremflickr.com/640/360"
            alt="фото профелю"
          />
        </div>
        <div className={'reviews__person'}>
          <p className={'reviews__name'}>Никітенко Андрій</p>
        </div>
        <div className={'reviews__ratings reviews__ratings--user'}>
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
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
        </div>
        <time
          className={'reviews__data'}
          dateTime={'12.09.2023'}
        >
          12.09.2023
        </time>
      </div>
      <div className={'reviews__content'}>
        <div className={'reviews__info'}>
          {/*   для большого количества текст*/}
          <p className={'reviews__info-text reviews__info--large'}>
            Привіт усім!) Навчався на курсі Frontend Full-time. І це було одне з найкращих рішень у моєму житті)Надзвичайно добре організований навчальний процес який
            зосереджений саме на практичні навички а також вразила висока кваліфікація менторів які завжди готові допомогти, порадити та дійсно хочуть навчити)Через
            надзвичайно короткий термін після закінчення курсу отримав перший оффер) Безмежно вдячний усій команді за знання атмосферу та дружній колектив) Привіт усім!)
            Навчався на курсі Frontend Full-time. І це було одне з найкращих рішень у моєму житті)Надзвичайно добре організований навчальний процес який зосереджений саме на
            практичні навички а також вразила висока кваліфікація менторів які завжди готові допомогти, порадити та дійсно хочуть навчити)Через надзвичайно короткий термін
            після закінчення курсу отримав перший оффер) Безмежно вдячний усій команді за знання атмосферу та дружній колектив) Привіт усім!) Навчався на курсі Frontend
            Full-time. І це було одне з найкращих рішень у моєму житті)Надзвичайно добре організований навчальний процес який зосереджений саме на практичні навички а також
            вразила висока кваліфікація менторів які завжди готові допомогти, порадити та дійсно хочуть навчити)Через надзвичайно короткий термін після закінчення курсу
            отримав перший оффер) Безмежно вдячний усій команді за знання атмосферу та дружній колектив) Привіт усім!) Навчався на курсі Frontend Full-time. І це було одне з
            найкращих рішень у моєму житті)Надзвичайно добре організований навчальний процес який зосереджений саме на практичні навички а також вразила висока кваліфікація
            менторів які завжди готові допомогти, порадити та дійсно хочуть навчити)Через надзвичайно короткий термін після закінчення курсу отримав перший оффер) Безмежно
            вдячний усій команді за знання атмосферу та дружній колектив) Привіт усім!) Навчався на курсі Frontend Full-time. І це було одне з найкращих рішень у моєму
            житті)Надзвичайно добре організований навчальний процес який зосереджений саме на практичні навички а також вразила висока кваліфікація менторів які завжди готові
            допомогти, порадити та дійсно хочуть навчити)Через надзвичайно короткий термін після закінчення курсу отримав перший оффер) Безмежно вдячний усій команді за знання
            атмосферу та дружній колектив) Привіт усім!) Навчався на курсі Frontend Full-time. І це було одне з найкращих рішень у моєму житті)Надзвичайно добре організований
            навчальний процес який зосереджений саме на практичні навички а також вразила висока кваліфікація менторів які завжди готові допомогти, порадити та дійсно хочуть
            навчити)Через надзвичайно короткий термін після закінчення курсу отримав перший оффер) Безмежно вдячний усій команді за знання атмосферу та дружній колектив)
            Привіт усім!) Навчався на курсі Frontend Full-time. І це було одне з найкращих рішень у моєму житті)Надзвичайно добре організований навчальний процес який
            зосереджений саме на практичні навички а також вразила висока кваліфікація менторів які завжди готові допомогти, порадити та дійсно хочуть навчити)Через
            надзвичайно короткий термін після закінчення курсу отримав перший оффер) Безмежно вдячний усій команді за знання атмосферу та дружній колектив) Привіт усім!)
            Навчався на курсі Frontend Full-time. І це було одне з найкращих рішень у моєму житті)Надзвичайно добре організований навчальний процес який зосереджений саме на
            практичні навички а також вразила висока кваліфікація менторів які завжди готові допомогти, порадити та дійсно хочуть навчити)Через надзвичайно короткий термін
            після закінчення курсу отримав перший оффер) Безмежно вдячний усій команді за знання атмосферу та дружній колектив)
          </p>
          <button className={'reviews__comments-btn  reviews__info-full'}>читати далі</button>
        </div>
        <div className={'reviews__comments'}>
          <button className={'reviews__content--btn reviews__comments-btn'}>Відповідь</button>
          <svg className="select__top-svg ">
            <use href="/img/sprite.svg#dropdown-arrow"></use>
          </svg>
        </div>
      </div>
    </div>
  )
}

// отзыв при открытии поля для ввода текста
function ReviewsBlockOpen() {
  return (
    <div className={'subject-card--blue reviews__box'}>
      <div className={'reviews__user'}>
        <div className={'archive__review-photo  reviews__user--photo'}>
          <img
            src="https://loremflickr.com/640/360"
            alt="фото профелю"
          />
        </div>
        <div className={'reviews__person'}>
          <p className={'reviews__name'}>Никітенко Андрій</p>
        </div>
        <div className={'reviews__ratings reviews__ratings--user'}>
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
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
        </div>
        <time
          className={'reviews__data'}
          dateTime={'12.09.2023'}
        >
          12.09.2023
        </time>
      </div>
      <div className={'reviews__content'}>
        <div className={'reviews__info'}>
          <p className={'reviews__info-text'}>
            Привіт усім!) Навчався на курсі Frontend Full-time. І це було одне з найкращих рішень у моєму житті)Надзвичайно добре організований навчальний процес який
            зосереджений саме на практичні навички а також вразила висока кваліфікація менторів які завжди готові допомогти, порадити та дійсно хочуть навчити)Через
            надзвичайно короткий термін після закінчення курсу отримав перший оффер) Безмежно вдячний усій команді за знання атмосферу та дружній колектив)
          </p>
        </div>
        <div className={'reviews__comments'}>
          <button className={'reviews__comments-btn'}>Відповідь</button>
          <svg className="select__top-svg ">
            <use href="/img/sprite.svg#dropdown-arrow"></use>
          </svg>
        </div>
        {/* reviews__comments--open доп класс который даёт  отступ  когда поле для комментария  открыто */}
        <div className={'reviews__callback reviews__comments--open'}>
          тут будет тексоторый редакрот как в блоке с редактированием урока учителем (только меньше возможностей)
        </div>
        <Button
          className={'reviews__content--btn some_button'}
          disabled
        >
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#plus"></use>
          </svg>
          додати відповідь
        </Button>
      </div>
    </div>
  )
}

// отзыв когда поле для ввода текст заполнено , кнопка доступна для нажатия и можно оставить отзыв
function ReviewsBlockInfo() {
  return (
    <div className={'subject-card--blue reviews__box'}>
      <div className={'reviews__user'}>
        <div className={'archive__review-photo  reviews__user--photo'}>
          <img
            src="https://loremflickr.com/640/360"
            alt="фото профелю"
          />
        </div>
        <div className={'reviews__person'}>
          <p className={'reviews__name'}>Никітенко Андрій</p>
        </div>
        <div className={'reviews__ratings reviews__ratings--user'}>
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
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
        </div>
        <time
          className={'reviews__data'}
          dateTime={'12.09.2023'}
        >
          12.09.2023
        </time>
      </div>
      <div className={'reviews__content'}>
        <div className={'reviews__info'}>
          <p className={'reviews__info-text'}>
            Привіт усім!) Навчався на курсі Frontend Full-time. І це було одне з найкращих рішень у моєму житті)Надзвичайно добре організований навчальний процес який
            зосереджений саме на практичні навички а також вразила висока кваліфікація менторів які завжди готові допомогти, порадити та дійсно хочуть навчити)Через
            надзвичайно короткий термін після закінчення курсу отримав перший оффер) Безмежно вдячний усій команді за знання атмосферу та дружній колектив)
          </p>
        </div>
        <div className={'reviews__comments'}>
          <button className={'reviews__comments-btn'}>Відповідь</button>
          <svg className="select__top-svg ">
            <use href="/img/sprite.svg#dropdown-arrow"></use>
          </svg>
        </div>
        {/* reviews__comments--open доп класс который даёт  отступ  когда поле для комментария  открыто */}
        <div className={'reviews__callback reviews__comments--open'}>
          тут будет тексоторый редакрот как в блоке с редактированием урока учителем (только меньше возможностей)
        </div>
        <Button className={'reviews__content--btn some_button'}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#plus"></use>
          </svg>
          додати Відповідь
        </Button>
      </div>
    </div>
  )
}

// отзыв оставлен
function ReviewsBlockDone() {
  return (
    <div className={'subject-card--blue reviews__box'}>
      <div className={'reviews__user'}>
        <div className={'archive__review-photo  reviews__user--photo'}>
          <img
            src="https://picsum.photos/40/40"
            alt="фото профелю"
          />
        </div>
        <div className={'reviews__person'}>
          <p className={'reviews__name'}>Никітенко Андрій</p>
        </div>
        <div className={'reviews__ratings reviews__ratings--user'}>
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
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
        </div>
        <time
          className={'reviews__data'}
          dateTime={'12.09.2023'}
        >
          12.09.2023
        </time>
      </div>
      <div className={'reviews__content'}>
        <div className={'reviews__info'}>
          {/*   для большого количества текст*/}
          <p className={'reviews__info-text'}>
            Привіт усім!) Навчався на курсі Frontend Full-time. І це було одне з найкращих рішень у моєму житті)Надзвичайно добре організований навчальний процес який
            зосереджений саме на практичні навички а також вразила висока кваліфікація менторів які завжди готові допомогти, порадити та дійсно хочуть навчити)Через
            надзвичайно короткий термін після закінчення курсу отримав перший оффер) Безмежно вдячний усій команді за знання атмосферу та дружній колектив) Привіт усім!)
            Навчався на курсі Frontend Full-time. І це було одне з найкращих рішень у моєму житті.
          </p>
        </div>
        <div className={'reviews__comments'}>
          <button className={'reviews__comments-btn'}>Відповідь</button>
          <svg className="select__top-svg ">
            <use href="/img/sprite.svg#dropdown-arrow"></use>
          </svg>
        </div>
        {/* reviews__comments--open доп класс который даёт  отступ  когда поле для комментария  открыто */}
        <div className={'reviews__info reviews__comments--open'}>
          <div className={'courses-catalog__teacher reviews__item-user'}>
            <div className="reviews__item-name">
              <div className={'courses-catalog__teacher-img'}>
                <img
                  src="https://loremflickr.com/640/360"
                  alt="фото профелю"
                />
              </div>
              <button>Бондар О. М.</button>
            </div>
            <div className={'reviews__item-data'}>
              <p className={'reviews__data'}>12.09.2023</p>
            </div>
          </div>
          <div className={'reviews__info reviews__item-text'}>
            <p className={'reviews__info-texts'}>
              Привіт усім!) Навчався на курсі Frontend Full-time. І це було одне з найкращих рішень у моєму житті)Надзвичайно добре організований навчальний процес який
              зосереджений саме на практичні навички а також вразила висока кваліфікація менторів які завжди готові допомогти, порадити та дійсно хочуть навчити)Через
              надзвичайно короткий термін після закінчення курсу отримав перший оффер) Безмежно вдячний усій команді за знання атмосферу та дружній колектив)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
