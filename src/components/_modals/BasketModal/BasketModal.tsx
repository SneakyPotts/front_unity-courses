import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import Cookies from 'universal-cookie'
import { useLocalStorage, useWindowSize } from 'usehooks-ts'

import Image from 'next/image'
import Link from 'next/link'

import { formattedPrice, imgBlur } from '@assets/utils'
import { appContext } from '@components/Context/context'
import { zodResolver } from '@hookform/resolvers/zod'
import { removeFromBasketAction } from '@http/profile/actions'
import { TBasketCourse } from '@http/profile/type'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { Field } from '_ui/Field'
import { Modal } from '_ui/Modal'
import { toastPromise } from '_ui/ToastUtils'

import { AuthForm } from '_modals/AuthModal'

import type { AuthInfoProps, BasketModalProps } from './BasketModal.props'

export function BasketModal({ onClose, showChildBoughtModal }: BasketModalProps) {
  const { profile, basket, setBasket } = useContext(appContext)
  const role = {
    teacher: profile?.role === 20,
    student: profile?.role === 2,
    parent: profile?.role === 10,
  }

  const [basketLocal, setBasketLocal] = useLocalStorage<TBasketCourse[] | null>('basket', null, { serializer: JSON.stringify, deserializer: JSON.parse })

  const { width } = useWindowSize()
  const isDesktop = width > 991

  const handleRemove = (id: string) => {
    if (!!profile) {
      toastPromise({
        handler: removeFromBasketAction(id),
        successCallback: () => {
          setBasket((p) => {
            const newBasket = p?.filter((t) => t.id !== id) || []

            if (!newBasket.length) onClose()

            return newBasket
          })
        },
        successMessage: 'Курс успішно видалено',
      })
    } else {
      const cookies = new Cookies()

      const idArray = cookies
        .get('basket')
        ?.split(',')
        ?.filter((v: string) => v !== id)

      !!idArray?.length ? cookies.set('basket', [idArray].join(',')) : cookies.remove('basket')

      const coursesList = basketLocal?.filter((v) => v.id !== id) || []

      setBasketLocal(!!coursesList.length ? coursesList : null)
      setBasket(!!coursesList.length ? coursesList : [])

      !coursesList.length && onClose()
    }
  }

  return (
    <Modal
      variant="basketModal"
      title="Кошик"
      onClose={isDesktop ? onClose : undefined}
      onBack={isDesktop ? undefined : onClose}
    >
      <div className={'basket-model__block'}>
        <div className="basket-model__courses">
          {basket?.map((v) => (
            <div
              key={v.id}
              className={'basket-model__list'}
            >
              <Link
                className={'basket-model__list-img'}
                href={`/courses/${v.id}`}
              >
                <Image
                  src={v.cover}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover', borderRadius: '5px' }}
                  {...imgBlur}
                  alt="alt"
                />
              </Link>
              <div className={'basket-model__info'}>
                <div
                  className={'basket-model__list-text'}
                  dangerouslySetInnerHTML={{ __html: v.description }}
                />
              </div>
              <div className={'basket-model__list-price'}>
                {!!v.discount && (
                  <s>
                    <span>{formattedPrice(v.price)} грн.</span>
                  </s>
                )}
                <p>{!!v.price ? `${formattedPrice(v.discount || v.price)} грн.` : 'Безкоштовно'}</p>
              </div>
              <div className={'basket-model__list-basket'}>
                <button
                  className={'basket-model__list-delete'}
                  onClick={() => handleRemove(v.id)}
                >
                  <svg>
                    <use href="/img/sprite.svg#basket"></use>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/*TODO: add childList for parents (commented bellow)*/}
        </div>
        {!!profile ? (
          <AuthInfo
            basket={basket}
            role={role}
            showChildBoughtModal={showChildBoughtModal}
          />
        ) : (
          <NotAuthInfo />
        )}
      </div>
    </Modal>
  )
}

function AuthInfo({ basket, role, showChildBoughtModal }: AuthInfoProps) {
  const totalPrice = basket?.reduce((acc, item) => acc + (item.discount || item.price), 0)
  const hasFree = basket?.find((v) => v.price === 0)

  const handleApprove = () => {
    showChildBoughtModal()
  }

  return (
    <div className="basket-model__card">
      <div className="basket-model__card-title">Придбати курс (и)</div>

      {(role.parent || role.teacher) && (
        <div className="basket-model__promo">
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
      )}

      <ul className={'basket-model__card-conditions'}>
        {hasFree && <li>Ви будете додані до безкоштовного курсу (курсів)</li>}
        {role.student && <li>Батькам буде відправлено запрос на покупку курсу (курсів).</li>}
      </ul>
      <ul className={'basket-model__card-quantity'}>
        {basket?.map((v, i) => (
          <li key={`${v.id}_${i}`}>
            <span>x1</span> <p>{v.title}</p>
            <div className="basket-model__card-price">{!!v.price ? `${formattedPrice(v.discount || v.price)} ₴` : 'Безкоштовно'}</div>
          </li>
        ))}
      </ul>
      {/*<ul className={'basket-model__card-quantity'}>*/}
      {/*  <li>*/}
      {/*    <span>x1</span> <p>Промо код</p>*/}
      {/*    <div className="basket-model__card-price">5 300 ₴</div>*/}
      {/*  </li>*/}
      {/*</ul>*/}
      {/*<ul className={'basket-model__card-quantity basket-model__card-quantity--element'}>*/}
      {/*  <li>*/}
      {/*    <p>підсумок</p>*/}
      {/*    <div className="basket-model__card-price basket-model__card-price--element">5 300 ₴</div>*/}
      {/*  </li>*/}
      {/*</ul>*/}

      {(role.parent || role.teacher) && (
        <>
          <div className={'basket-model__result'}>
            <p className={'basket-model__result-text'}>Всього:</p>
            <p className={'basket-model__result-sum'}>{formattedPrice(totalPrice ?? 0)} грн.</p>
          </div>
          <div className={'basket-model__button'}>
            <Button>оплатити</Button>
          </div>
        </>
      )}

      {role.student && (
        <div className="basket-model__buttons">
          <Button
            className={'some_button basket-model__buttons-btn'}
            variant={'border'}
          >
            відхилити
          </Button>
          <Button
            className={'basket-model__buttons-btn'}
            onClick={handleApprove}
          >
            підтвердити
          </Button>
        </div>
      )}
    </div>
  )
}

function NotAuthInfo() {
  return (
    <div className="basket-model__card">
      <div className="basket-model__card-title">Оформлення замовлення</div>
      <p className={'basket-model__card-subtitle'}>Замовлення готове до оформлення! Будь ласка, увійдіть або зареєструйтеся щоб продовжити.</p>

      <AuthForm isBasket />
    </div>
  )
}

// <ul className={'basket-model__list'}>
//   <li className={'basket-model__list-img'}>
//     <Image
//       src="https://loremflickr.com/100/100"
//       width={100}
//       height={100}
//       style={{ objectFit: 'cover', borderRadius: '5px' }}
//       {...imgBlur}
//       alt="alt"
//     />
//   </li>
//   <li className={'basket-model__info'}>
//     <p className={'basket-model__list-text'}>
//       Вступ до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями
//     </p>
//   </li>
//   <li className={'basket-model__sorting'}>
//     <div className={'basket-model__container'}>
//       <p className={'basket-model__container-text'}>Оберіть для кого:</p>
//       <div className={'basket-model__container-img'}>
//         <Image
//           src="https://loremflickr.com/100/100"
//           width={24}
//           height={24}
//           style={{ objectFit: 'cover' }}
//           {...imgBlur}
//           alt="alt"
//         />
//         <Image
//           src="https://loremflickr.com/100/100"
//           width={24}
//           height={24}
//           style={{ objectFit: 'cover' }}
//           {...imgBlur}
//           alt="alt"
//         />
//         <Image
//           src="https://loremflickr.com/100/100"
//           width={24}
//           height={24}
//           style={{ objectFit: 'cover' }}
//           {...imgBlur}
//           alt="alt"
//         />
//       </div>
//       <button className={'basket-model__container-btn'}>
//         <svg>
//           <use href="/img/sprite.svg#basket-modal__arrow"></use>
//         </svg>
//       </button>
//       <ul className={'basket-model__catalog'}>
//         <li className={'basket-model__catalog-item'}>
//           <Checkbox classWrapper={'some-wrapper-class'} />
//           <div className={'basket-model__catalog-block'}>
//             <Image
//               src="https://loremflickr.com/24/24"
//               width={24}
//               height={24}
//               style={{ objectFit: 'cover' }}
//               {...imgBlur}
//               alt="alt"
//             />
//             <p>Дмитро</p>
//           </div>
//         </li>
//         <li className={'basket-model__catalog-item'}>
//           <Checkbox classWrapper={'some-wrapper-class'} />
//           <div className={'basket-model__catalog-block'}>
//             <Image
//               src="https://loremflickr.com/24/24"
//               width={24}
//               height={24}
//               style={{ objectFit: 'cover' }}
//               {...imgBlur}
//               alt="alt"
//             />
//             <p>Дмитро</p>
//           </div>
//         </li>
//         <li className={'basket-model__catalog-item'}>
//           <Checkbox classWrapper={'some-wrapper-class'} />
//           <div className={'basket-model__catalog-block'}>
//             <Image
//               src="https://loremflickr.com/24/24"
//               width={24}
//               height={24}
//               style={{ objectFit: 'cover' }}
//               {...imgBlur}
//               alt="alt"
//             />
//             <p>Дмитро</p>
//           </div>
//         </li>
//       </ul>
//     </div>
//   </li>
//   <li className={'basket-model__list-price'}>
//     <s>6 800 грн.</s>
//     <p>5 300 грн.</p>
//   </li>
//   <li className={'basket-model__list-basket'}>
//     <button className={'basket-model__list-delete'}>
//       <svg>
//         <use href="/img/sprite.svg#basket"></use>
//       </svg>
//     </button>
//   </li>
// </ul>
