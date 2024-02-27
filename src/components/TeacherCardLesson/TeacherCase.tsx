import Image from 'next/image'

export function TeacherCase({ ...props }) {
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
        <div className={'teacher-case__box'}>
          <div className={'teacher-case__info'}>
            <h2 className={'teacher-case__title'}> Вступ до мови програмування Python</h2>
            <p className={'teacher-case__info-text'}>
              Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять до
              навчання з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні аспекти
              мистецтва та надають можливість долучитися до творчих завдань.
            </p>
          </div>
          <ul className={'teacher-case__list'}>
            <li className={'teacher-case__list-item'}>
              <div className={'teacher-case__list-block'}>
                <svg>
                  <use href="/img/sprite.svg#camera"></use>
                </svg>
                <p>Заняття проводяться з викладачем у live режимі (НЕ відео-запис)</p>
              </div>
            </li>
            <li className={'teacher-case__list-item'}>
              <div className={'teacher-case__list-block'}>
                <svg>
                  <use href="/img/sprite.svg#clock"></use>
                </svg>
                <p>доступність:</p>
                <div className={'teacher-case__list-elements'}>
                  <span>доступний усім</span>
                  <span>доступний усім</span>
                </div>
              </div>
              <div className={'teacher-case__list-block'}>
                <svg>
                  <use href="/img/sprite.svg#camera"></use>
                </svg>
              </div>
            </li>
            <li className={'teacher-case__list-item'}>
              <div className={'teacher-case__list-block'}>
                <svg>
                  <use href="/img/sprite.svg#camera"></use>
                </svg>
              </div>
              <div className={'teacher-case__list-block'}>
                <svg>
                  <use href="/img/sprite.svg#camera"></use>
                </svg>
              </div>
            </li>
            <li className={'teacher-case__list-item'}>
              <div className={'teacher-case__list-block'}>
                <svg>
                  <use href="/img/sprite.svg#camera"></use>
                </svg>
              </div>
              <div className={'teacher-case__list-block'}>
                <svg>
                  <use href="/img/sprite.svg#camera"></use>
                </svg>
              </div>
            </li>
          </ul>
        </div>
        <div className={'teacher-case__box'}>
          <div className="teacher-case__img">
            {/* <ul className={'teacher-case__box-tags'}>
              <li>Підготовка</li>
              <li>Підготовка</li>
            </ul> */}
            <Image
              src={props.cover}
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
      <div className={'teacher-case__btn'}>
        <button className={'btn btn--trans'}>відмінити модерацію</button>
      </div>
    </div>
  )
}
