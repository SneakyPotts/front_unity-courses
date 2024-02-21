import React from 'react'
import { useWindowSize } from 'usehooks-ts'

import Image from 'next/image'

import { imgBlur } from '@assets/utils'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { Modal } from '_ui/Modal'

import type { BasketModalProps } from './BasketModal.props'

export function BasketModal({ onClose }: BasketModalProps) {
  const { width } = useWindowSize()
  const isDesktop = width > 991

  return (
    <Modal
      variant="basketModal"
      title="Кошик"
      onClose={isDesktop ? onClose : undefined}
      onBack={isDesktop ? undefined : onClose}
    >
      <div className={'basket-model__block'}>
        <div className="basket-model__courses">
          <ul className={'basket-model__list'}>
            <li className={'basket-model__list-img'}>
              <Image
                src="https://loremflickr.com/100/100"
                width={100}
                height={100}
                style={{ objectFit: 'cover', borderRadius: '5px' }}
                {...imgBlur}
                alt="alt"
              />
            </li>
            <li className={'basket-model__info'}>
              <p className={'basket-model__list-text'}>
                Вступ до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями
              </p>
            </li>
            <li className={'basket-model__list-price'}>
              <s>6 800 грн.</s>
              <p>5 300 грн.</p>
            </li>
            <li className={'basket-model__list-basket'}>
              <button className={'basket-model__list-delete'}>
                <svg>
                  <use href="/img/sprite.svg#basket"></use>
                </svg>
              </button>
            </li>
          </ul>
          <ul className={'basket-model__list'}>
            <li className={'basket-model__list-img'}>
              <Image
                src="https://loremflickr.com/100/100"
                width={100}
                height={100}
                style={{ objectFit: 'cover', borderRadius: '5px' }}
                {...imgBlur}
                alt="alt"
              />
            </li>
            <li className={'basket-model__info'}>
              <p className={'basket-model__list-text'}>
                Вступ до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями
              </p>
            </li>
            <li className={'basket-model__sorting'}>
              <div className={'basket-model__container'}>
                <p className={'basket-model__container-text'}>Оберіть для кого:</p>
                <div className={'basket-model__container-img'}>
                  <Image
                    src="https://loremflickr.com/100/100"
                    width={24}
                    height={24}
                    style={{ objectFit: 'cover' }}
                    {...imgBlur}
                    alt="alt"
                  />
                  <Image
                    src="https://loremflickr.com/100/100"
                    width={24}
                    height={24}
                    style={{ objectFit: 'cover' }}
                    {...imgBlur}
                    alt="alt"
                  />
                  <Image
                    src="https://loremflickr.com/100/100"
                    width={24}
                    height={24}
                    style={{ objectFit: 'cover' }}
                    {...imgBlur}
                    alt="alt"
                  />
                </div>
                <button className={'basket-model__container-btn'}>
                  <svg>
                    <use href="/img/sprite.svg#basket-modal__arrow"></use>
                  </svg>
                </button>
                <ul className={'basket-model__catalog'}>
                  <li className={'basket-model__catalog-item'}>
                    <Checkbox classWrapper={'some-wrapper-class'} />
                    <div className={'basket-model__catalog-block'}>
                      <Image
                        src="https://loremflickr.com/24/24"
                        width={24}
                        height={24}
                        style={{ objectFit: 'cover' }}
                        {...imgBlur}
                        alt="alt"
                      />
                      <p>Дмитро</p>
                    </div>
                  </li>
                  <li className={'basket-model__catalog-item'}>
                    <Checkbox classWrapper={'some-wrapper-class'} />
                    <div className={'basket-model__catalog-block'}>
                      <Image
                        src="https://loremflickr.com/24/24"
                        width={24}
                        height={24}
                        style={{ objectFit: 'cover' }}
                        {...imgBlur}
                        alt="alt"
                      />
                      <p>Дмитро</p>
                    </div>
                  </li>
                  <li className={'basket-model__catalog-item'}>
                    <Checkbox classWrapper={'some-wrapper-class'} />
                    <div className={'basket-model__catalog-block'}>
                      <Image
                        src="https://loremflickr.com/24/24"
                        width={24}
                        height={24}
                        style={{ objectFit: 'cover' }}
                        {...imgBlur}
                        alt="alt"
                      />
                      <p>Дмитро</p>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className={'basket-model__list-price'}>
              <s>6 800 грн.</s>
              <p>5 300 грн.</p>
            </li>
            <li className={'basket-model__list-basket'}>
              <button className={'basket-model__list-delete'}>
                <svg>
                  <use href="/img/sprite.svg#basket"></use>
                </svg>
              </button>
            </li>
          </ul>
          <ul className={'basket-model__list'}>
            <li className={'basket-model__list-img'}>
              <Image
                src="https://loremflickr.com/100/100"
                style={{ objectFit: 'cover', borderRadius: '5px' }}
                alt="alt"
                width={100}
                height={100}
              />
            </li>
            <li className={'basket-model__info'}>
              <p className={'basket-model__list-text'}>
                Вступ до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями
              </p>
            </li>
            <li className={'basket-model__list-price'}>
              <s>6 800 грн.</s>
              <p>5 300 грн.</p>
            </li>
            <li className={'basket-model__list-basket'}>
              <button className={'basket-model__list-delete'}>
                <svg>
                  <use href="/img/sprite.svg#basket"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <div className="basket-model__card">
          <div className="basket-model__card-title">Придбати курс (и)</div>
          <div className="">
            <p className={'basket-model__card-subtitle'}>На одне замовлення можна застосувати лише один код знижки</p>
            <div className={'basket-model__field'}>
              <input
                className={'input  '}
                placeholder={'Ваш код тут'}
                type=""
              />
              <button className={'basket-model__field-btn'}>
                <svg>
                  <use href="/img/sprite.svg#check-mark"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className={'basket-model__card-conditions'}>
            <li>Ви будете додані до безкоштовного курсу (курсів)</li>
            <li>Батькам буде відправлено запрос на покупку курсу (курсів).</li>
          </ul>
          <ul className={'basket-model__card-quantity'}>
            <li>
              <span>x1</span> <p>до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями</p>
              <div className="basket-model__card-price">5 300 ₴</div>
            </li>
            <li>
              <span>x1</span>
              <p>Medium рівень програмування на JavaScript: розширення навичок з веб-розробки та створення динамічних інтерактивних веб-сайтів</p>
              <div className="basket-model__card-price">5 300 ₴</div>
            </li>
            <li>
              <span>x1</span>
              <p>Образотворче мистецтво для 10-11 класів веб-сайтів</p>
              <div className="basket-model__card-price">Безкоштовно</div>
            </li>
          </ul>
          <ul className={'basket-model__card-quantity'}>
            <li>
              <span>x1</span> <p>Промо код</p>
              <div className="basket-model__card-price">5 300 ₴</div>
            </li>
          </ul>
          <ul className={'basket-model__card-quantity basket-model__card-quantity--element'}>
            <li>
              <p>підсумок</p>
              <div className="basket-model__card-price basket-model__card-price--element">5 300 ₴</div>
            </li>
          </ul>

          <div className={'basket-model__result'}>
            <p className={'basket-model__result-text'}>Всього:</p>
            <p className={'basket-model__result-sum'}> 20 700 грн.</p>
          </div>
          <div className={'basket-model__button'}>
            <Button>оплатити</Button>
          </div>

          <div className="basket-model__buttons">
            <Button
              className={'some_button basket-model__buttons-btn'}
              variant={'border'}
            >
              відхилити
            </Button>
            <Button className={'basket-model__buttons-btn'}>підтвердити</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
