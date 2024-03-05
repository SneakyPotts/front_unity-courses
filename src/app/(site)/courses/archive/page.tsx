'use client'

import { useState } from 'react'

import Image from 'next/image'

import { imgBlur } from '@assets/utils'

import { Banner } from '_ui/Banner'
import { Button } from '_ui/Button'
import { Tabs } from '_ui/Tabs'

const tabs = ['Про курс', 'Програма та графік', 'Викладачі', 'Відгуки']

export default function CoursesArchive() {
  return (
    <div className="content">
      <div className="content__container container">
        <section className={'archive'}>
          <div className={'archive__inner'}>
            <div className={'archive__block'}>
              <div className={'archive__head subject-card--purple'}>
                <div className={'archive__item archive__item--text'}>
                  <h1 className={'archive__title'}>Образотворче мистецтво для 10-11 класів</h1>
                </div>
                <div className={'archive__item archive__photo'}>
                  <ul className={'courses-catalog__tag'}>
                    <li>Пiдготовка</li>
                  </ul>
                  <div className={'archive__img'}>
                    <Image
                      src="https://picsum.photos/400/200"
                      style={{ objectFit: 'cover' }}
                      width={400}
                      height={200}
                      {...imgBlur}
                      alt="фото курса"
                    />
                  </div>
                </div>
                <div className={'archive__item archive__item--element'}>
                  <div className={'archive__data my-catalog__condition--violet'}>
                    <svg className="archive__data-svg">
                      <use href="/img/sprite.svg#clock"></use>
                    </svg>
                    <p>старт курсу - 10 грудня 2023</p>
                  </div>
                  <div className={'archive__conditions'}>
                    <svg className="nav__link-svg">
                      <use href="/img/sprite.svg#camera"></use>
                    </svg>
                    <p className={'archive__conditions-text'}>Заняття проводяться з викладачем у live режимі (НЕ відео-запис)</p>
                  </div>
                  <div className={'archive__duration'}>
                    <div className={'archive__duration-box'}>
                      <svg className="nav__link-svg">
                        <use href="/img/sprite.svg#calendar"></use>
                      </svg>
                      <p>1 місяць</p>
                    </div>
                    <div className={'archive__duration-box'}>
                      <svg className="nav__link-svg">
                        <use href="/img/sprite.svg#material"></use>
                      </svg>
                      <p>5 занять</p>
                    </div>
                    <div className={'archive__duration-box'}>
                      <svg className="nav__link-svg">
                        <use href="/img/sprite.svg#clock"></use>
                      </svg>
                      <p>10 годин</p>
                    </div>
                    <div className={'archive__duration-box'}>
                      <svg className="nav__link-svg nav__link-svg--element">
                        <use href="/img/sprite.svg#star"></use>
                      </svg>
                      <p>4.5</p>
                    </div>
                  </div>
                </div>
                <div className={'archive__item archive__ridth'}>
                  <div className={'archive__sign archive__item--element'}>
                    <div className={'archive__places'}>
                      <svg className="nav__link-svg">
                        <use href="/img/sprite.svg#man"></use>
                      </svg>
                      <svg className="nav__link-svg">
                        <use href="/img/sprite.svg#woman"></use>
                      </svg>
                      <p className="archive__places-text">залишилось мість: 8 з 18</p>
                    </div>
                    <button className={'teacher-card__question archive__btn--element'}>
                      <svg className="teacher-card__question-svg">
                        <use href="/img/sprite.svg#message"></use>
                      </svg>
                      Задати питання
                    </button>
                  </div>
                  <div className={'archive__result archive__item--element'}>
                    <div className="archive__price">
                      <s className={'archive__price-discount'}>6 800 грн.</s>
                      <p className={'archive__price-text'}>5 300 грн.</p>
                    </div>
                    <Button className={'some_button  reviews__content--btn'}>
                      <svg className={'courses-catalog__icon courses-catalog__icon--element'}>
                        <use href="/img/sprite.svg#basket-shopping"></use>
                      </svg>
                      Хочу на курс
                    </Button>
                  </div>
                </div>
              </div>
              <div className={'archive__menu'}>
                <ContentTabs />
              </div>
            </div>
            <div className={'archive__banner'}>
              <div className={'archive__banner-box'}>
                <Banner />
              </div>
              <div className={'archive__banner-box'}>
                <Banner />
              </div>
              <div className={'archive__banner-box'}>
                <Banner />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function ContentTabs() {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <>
      <Tabs
        className={'add-here-some-class-Artem'}
        list={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSmall
      />
      {activeTab === 1 && <AboutTab />}
      {activeTab === 2 && <ScheduleTab />}
      {activeTab === 3 && <TeachersTab />}
      {activeTab === 4 && <ReviewsTab />}
    </>
  )
}

function AboutTab() {
  return (
    <div className={'archive__about archive__content'}>
      {/* about  */}
      <h3 className={'archive__about-title'}>Образотворче мистецтво для 10-11 класів</h3>
      <div className={'archive__about-info'}>
        <p className={'archive__subtitle'}>Про курс</p>
        <p className={'archive__about-text'}>
          Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять до
          навчання з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні аспекти мистецтва
          та надають можливість долучитися до творчих завдань.
        </p>
        <p className={'archive__about-text'}>
          Створення спільноти, де учні можуть обговорювати враження від уроків, ділитися власними творчими роботами та надавати поради один одному. Можливість отримання
          конструктивного фідбеку від викладачів та консультації з тем, що цікавить учня. Простір для виставки робіт учнів, де кожен може поділитися своїми досягненнями та
          отримати позитивний відгук від спільноти.
        </p>
      </div>
      <div className={'archive__program'}>
        <h3 className={'archive__program-subtitle archive__subtitle'}>Програма та графік</h3>
        {/* it will be here accordions  */}
      </div>
      <h3 className={'archive__subtitle'}>Викладачі курсу</h3>
      {/* teacher card */}
      <div className={'archive__personal'}>
        <TeacherBox />
        <TeacherBox />
      </div>
      {/* reviews users */}
      <div className={'archive__reviews'}>
        <div className={'archive__reviews-top'}>
          <h3 className={'archive__subtitle'}>Відгуки</h3>
          <Button
            className={'some_button'}
            variant={'border'}
          >
            <svg className="archive__data-svg">
              <use href="/img/sprite.svg#message"></use>
            </svg>
            Всі відгуки
          </Button>
        </div>
        <div className={'archive__reviews-content'}>
          <ReviewsCard />
          <ReviewsCard />
          <ReviewsCard />
          <ReviewsCard />
        </div>
        {/* <div className={'offer'}>
          <div className={'offer__inner'}>
            <div className={'offer__title'}>
              Ще не знаєте, з якого курсу почати?
              <svg>
                <use href="/img/sprite.svg#course-magnifying"></use>
              </svg>
            </div>
            <ul className={'offer__list'}>
              <li className={'offer__item'}>
                <span className={'offer__item-mark'}>
                  <svg>
                    <use href="/img/sprite.svg#check-mark"></use>
                  </svg>
                </span>
                Зверніть увагу на наші рекомендації або скористайтеся пошуком, щоб знайти те, що вам дійсно цікаво.
              </li>
              <li className={'offer__item'}>
                <span className={'offer__item-mark'}>
                  <svg>
                    <use href="/img/sprite.svg#check-mark"></use>
                  </svg>
                </span>
                Ваша освіта - це не лише процес, це ваш особистий розвиток. Разом з нами ви зможете знайти той курс, який робить вашу освіту неповторною.
              </li>
            </ul>
            <div className={'offer__button'}>
              <Button className={'offer__btn'}>
                <svg>
                  <use href="/img/sprite.svg#cours"></use>
                </svg>
                каталог курсів
              </Button>
            </div>

            <div className={'offer__decor'}>
              <svg>
                <use href="/img/sprite.svg#offer-like"></use>
              </svg>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

function ScheduleTab() {
  return (
    <div className={' archive__content'}>
      <h1>Some information for ScheduleTab</h1>
    </div>
  )
}
function TeachersTab() {
  return (
    <div className={' archive__content'}>
      <h1>Some information for TeachersTab</h1>
    </div>
  )
}
// отзывы
function ReviewsTab() {
  return (
    <div className={'archive__content'}>
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
                      src="/img/static/teacher__photo.png"
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
            <ReviewsBlockCloce />
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
    </div>
  )
}
// teacher info
function TeacherBox() {
  return (
    <div className={'archive__teaher'}>
      <div className={'archive__teaher-photo'}>
        <img
          src="https://picsum.photos/307/300"
          alt="фото вчителя який веде курс"
        />
      </div>
      <div className={'archive__person'}>
        <h3 className={'archive__person-name archive__subtitle'}>Кайдаш Людмила Миколаївна</h3>
        <p className={'archive__person-text'}>
          Вчителька ліцею № 2 м. Житомира, поетка і письменниця, організаторка щорічного Всеукраїнського Літературного фестивалю «Шодуарівська Альтанка» у м. Житомир
        </p>
        <ul className={'archive__person-list '}>
          <li className={'archive__person-item'}>
            <span className={'archive__person-span'}>Креативна Інтеграція Технологій:</span> Впровадження сучасних технологій у навчальний процес для створення вражаючих
            мистецьких проектів.
          </li>
          <li className={'archive__person-item'}>
            <span className={'archive__person-span'}>Ефективне Міжособистісне Спілкування:</span> Здатність вести діалог з учнями, стимулюючи висловлювання їхнього творчого
            потенціалу.
          </li>
          <li className={'archive__person-item'}>
            <span className={'archive__person-span'}>Громадська Активність:</span> Активна участь у заходах мистецької спільноти та організація мистецьких виставок та
            конкурсів серед учнів.
          </li>
        </ul>
      </div>
    </div>
  )
}
// reviews
function ReviewsCard() {
  return (
    <div className={'archive__review'}>
      <div className={'archive__review-top'}>
        <div className={'archive__review-user'}>
          <div className={'reviews__person'}>
            <div className={'archive__review-photo'}>
              <img
                src="/img/static/test.webp"
                alt="фото профиля"
              />
            </div>
          </div>
          <p>Биков Руслан</p>
        </div>
        <div className={'archive__review-assessment'}>
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
          <p>4.5</p>
        </div>
      </div>
      <p className={'archive__review-text'}>
        Цей курс змінив мій погляд на мистецтво. Вчитель створив таке захоплююче навчальне середовище, де ми не лише вивчаємо техніку, але і розкриваємо свій в
      </p>
      <a
        href="#"
        className={'archive__review-link'}
      >
        Відгук повністю
      </a>
    </div>
  )
}

// написание отзывы (его создание)
function ReviewsAdd() {
  return (
    <div className={'subject-card--blue reviews__box'}>
      <div className={'reviews__user'}>
        <div className={'archive__review-photo  reviews__user--photo'}>
          <img
            src="/img/static/test.webp"
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
            src="/img/static/test.webp"
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
function ReviewsBlockCloce() {
  return (
    <div className={'subject-card--blue reviews__box'}>
      <div className={'reviews__user'}>
        <div className={'archive__review-photo reviews__user--photo'}>
          <img
            src="/img/static/test.webp"
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
            src="/img/static/test.webp"
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
            src="/img/static/test.webp"
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
                  src="/img/static/test.webp"
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
