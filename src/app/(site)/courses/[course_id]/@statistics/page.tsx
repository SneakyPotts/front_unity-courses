import React from 'react'

export default function AsideRight() {
  return (
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
  )
}
