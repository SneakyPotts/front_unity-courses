import classNames from 'classnames'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import { useLocalStorage, useOnClickOutside, useWindowSize } from 'usehooks-ts'

import Image from 'next/image'
import Link from 'next/link'

import { formattedPrice, imgBlur } from '@assets/utils'
import { appContext } from '@components/Context/context'
import { buyByLiqPay, patchParentBasket, removeFromBasketAction, revalidateCourses } from '@http/profile/actions'
import { TBasketCourse, TParentRegistration } from '@http/profile/type'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { Modal } from '_ui/Modal'
import { errorIcon, successIcon, toastPromise } from '_ui/ToastUtils'

import { AuthForm } from '_modals/AuthModal'

import type { AuthInfoProps, BasketModalProps, NotAuthInfoProps } from './BasketModal.props'

export function BasketModal({ onClose, showRecoveryPass, showRegisterBasket, showChildBoughtModal }: BasketModalProps) {
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

              <ChildList
                profile={profile?.parent_profile}
                course={v}
              />
            </div>
          ))}
        </div>
        {!!profile ? (
          <AuthInfo
            profile={profile}
            role={role}
            basket={basket}
            showChildBoughtModal={showChildBoughtModal}
            onClose={onClose}
          />
        ) : (
          <NotAuthInfo
            showRecoveryPass={showRecoveryPass}
            showRegisterBasket={showRegisterBasket}
          />
        )}
      </div>
    </Modal>
  )
}

function AuthInfo({ profile, role, basket, showChildBoughtModal, onClose }: AuthInfoProps) {
  const payForm = useRef<HTMLFormElement>(null)

  const info = useMemo(
    () => ({
      total: basket?.reduce((acc, item) => acc + (item.discount || item.price) * (item.users?.length || 1), 0),
      free: basket?.find((v) => v.price === 0),
    }),
    [basket],
  )

  const [isPayCreating, setIsPayCreating] = useState(false)
  const [liqPayKeys, setLiqPayKeys] = useState<{ data?: string; signature?: string }>({
    data: undefined,
    signature: undefined,
  })

  const handlePaying = async () => {
    setIsPayCreating(true)
    // const timeout = setTimeout(() => {
    //   setLiqPayKeys({
    // eslint-disable-next-line max-len
    //     data: 'eyJhY3Rpb24iOiAicGF5IiwgImFtb3VudCI6ICI3MDAiLCAiY3VycmVuY3kiOiAiVUFIIiwgImRlc2NyaXB0aW9uIjogIlx1MDQxZVx1MDQzZlx1MDQzYlx1MDQzMFx1MDQ0Mlx1MDQzMCBcdTA0M2FcdTA0NDNcdTA0NDBcdTA0NDFcdTA0NTZcdTA0MzIgKFx1MDQxNFx1MDQzMFx1MDQzZFx1MDQ1Nlx1MDQ1Nlx1MDQzYiBcdTA0MWFcdTA0NDBcdTA0MzBcdTA0MzJcdTA0NDdcdTA0MzVcdTA0M2RcdTA0M2FcdTA0M2UpIiwgIm9yZGVyX2lkIjogImQ4MTcwODAwLTUwYWMtNDNiNS1iN2Q0LTdjNmM5Zjg4ZjZkYSIsICJwdWJsaWNfa2V5IjogInNhbmRib3hfaTMyODkyMjU0ODg2IiwgInJyb19pbmZvIjogeyJkZWxpdmVyeV9lbWFpbHMiOiBbInN0dWRlbnQxQG1haWwuY29tIl0sICJpdGVtcyI6IFt7ImlkIjogIjZjOGY4MmE1LTM0ZTMtNGVhMy04MWY0LWM5NWQ0MzgxYjJmOSIsICJwcmljZSI6IDcwMCwgInRpdGxlIjogIkNvdXJzZSA0IiwgInR5cGUiOiAiY291cnNlIn1dfSwgInNhbmRib3giOiAwLCAic2VydmVyX3VybCI6ICJodHRwczovL2ZsYXQtY29ybmVycy1zaW5rLmxvY2EubHQvYXBpL3YxL2NvdXJzZXMvY2FydC9wYXkvIiwgInZlcnNpb24iOiAiMyJ9',
    //     signature: '6lg1anzlJf15DOqYDtT0yPHt0EQ=',
    //   })
    //
    //   clearTimeout(timeout)
    // }, 2000)

    buyByLiqPay().then(({ data, error }) => {
      if (!error && !!data) {
        const { status, ...reqData } = data

        if (!!status && !reqData.data && !reqData.signature) {
          if (role.student) {
            showChildBoughtModal()
          } else {
            revalidateCourses()

            toast.success('Ви успішно отримали безкоштовний курс', successIcon)
          }

          onClose()
        } else {
          setLiqPayKeys(reqData)
        }
      } else {
        toast.error('Щось пішло не так...', errorIcon)
      }
    })
  }

  useEffect(() => {
    if (!!liqPayKeys.data && !!liqPayKeys.signature) {
      payForm.current?.submit()

      setIsPayCreating(false)
      onClose()
    }
  }, [liqPayKeys])

  return (
    <div className="basket-model__card">
      <div className="basket-model__card-title">Придбати курс (и)</div>

      {!role.student && (
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
        {info.free && <li>Ви будете додані до безкоштовного курсу (курсів)</li>}
        {role.student && <li>Батькам буде відправлено запрос на покупку курсу (курсів).</li>}
      </ul>
      <ul className={'basket-model__card-quantity'}>
        {basket?.map((v, i) => (
          <li key={`${v.id}_${i}`}>
            <span>x{v.users?.length || 1}</span> <p>{v.title}</p>
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

      {!role.student && (
        <>
          <div className={'basket-model__result'}>
            <p className={'basket-model__result-text'}>Всього:</p>
            <p className={'basket-model__result-sum'}>{formattedPrice(info.total ?? 0)} грн.</p>
          </div>
          <div className={'basket-model__button'}>
            <Button
              onClick={handlePaying}
              disabled={isPayCreating}
            >
              оплатити
            </Button>
            <form
              ref={payForm}
              className="visually-hidden"
              method="POST"
              acceptCharset="utf-8"
              action="https://www.liqpay.ua/api/3/checkout/"
              target="_blank"
            >
              <input
                type="hidden"
                name="data"
                value={liqPayKeys.data}
              />
              <input
                type="hidden"
                name="signature"
                value={liqPayKeys.signature}
              />
            </form>
          </div>
        </>
      )}

      {role.student && (
        <div className="basket-model__buttons">
          <Button
            className={'some_button basket-model__buttons-btn'}
            variant={'border'}
            onClick={onClose}
          >
            відхилити
          </Button>
          <Button
            className={'basket-model__buttons-btn'}
            onClick={handlePaying}
          >
            підтвердити
          </Button>
        </div>
      )}
    </div>
  )
}

function NotAuthInfo({ showRecoveryPass, showRegisterBasket }: NotAuthInfoProps) {
  return (
    <div className="basket-model__card">
      <div className="basket-model__card-title">Оформлення замовлення</div>
      <p className={'basket-model__card-subtitle'}>Замовлення готове до оформлення! Будь ласка, увійдіть або зареєструйтеся щоб продовжити.</p>

      <AuthForm
        showRecoveryPass={showRecoveryPass}
        showRegisterBasket={showRegisterBasket}
        isBasket
      />
    </div>
  )
}

function ChildList({ profile, course }: { profile?: TParentRegistration; course: TBasketCourse }) {
  const container = useRef<HTMLDivElement | null>(null)

  const [isShow, setIsShow] = useState(false)
  const [activeId, setActiveId] = useState<string[]>(course.users || [])

  const [referenceElement, setReferenceElement] = useState<any>(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
  })

  const handleEdit = async (user_id: string) => {
    const newArrId = activeId.includes(user_id) ? activeId.filter((id) => id !== user_id) : [...activeId, user_id]

    setActiveId(newArrId)
    await patchParentBasket({ course_id: course.id, user_ids: newArrId })
  }

  useOnClickOutside(container, () => setIsShow(false))

  if (!profile) return null

  return (
    <div
      ref={(ref) => {
        container.current = ref
        setReferenceElement(ref)
      }}
      className={'basket-model__sorting'}
    >
      <div className={'basket-model__container'}>
        <p className={'basket-model__container-text'}>Оберіть для кого:</p>
        <div className={'basket-model__container-img'}>
          <div className={classNames('basket-model__container-avatar', { 'basket-model__container--person': activeId.includes(profile.id) })}>
            <Image
              src={profile?.avatar || '/img/static/default-avatar.png'}
              width={24}
              height={24}
              style={{ objectFit: 'cover' }}
              alt={`${profile?.last_name} ${profile?.first_name}`}
            />
          </div>

          {profile?.childs?.map((child) => (
            <div
              key={child.id}
              className={classNames('basket-model__container-avatar', { 'basket-model__container--person': activeId.includes(child.id) })}
            >
              <Image
                src={child?.avatar || '/img/static/default-avatar.png'}
                width={24}
                height={24}
                style={{ objectFit: 'cover' }}
                alt={`${child?.last_name} ${child?.first_name}`}
              />
            </div>
          ))}
        </div>
        <button
          className={'basket-model__container-btn'}
          onClick={() => setIsShow((p) => !p)}
        >
          <svg>
            <use href="/img/sprite.svg#basket-modal__arrow"></use>
          </svg>
        </button>
        {isShow && (
          <ul
            ref={setPopperElement}
            className={'basket-model__catalog'}
            {...attributes.popper}
            style={styles.popper}
          >
            <li className={'basket-model__catalog-item'}>
              <Checkbox
                classWrapper={'some-wrapper-class'}
                defaultChecked={activeId.includes(profile.id)}
                onChange={() => handleEdit(profile.id)}
              />
              <div className={'basket-model__catalog-block'}>
                <Image
                  src={profile?.avatar || '/img/static/default-avatar.png'}
                  width={24}
                  height={24}
                  style={{ objectFit: 'cover' }}
                  alt={`${profile?.last_name} ${profile?.first_name}`}
                />
                <p>{profile.first_name}</p>
              </div>
            </li>
            {profile.childs?.map((child) => (
              <li
                key={child.id}
                className={'basket-model__catalog-item'}
              >
                <Checkbox
                  classWrapper={'some-wrapper-class'}
                  defaultChecked={activeId.includes(child.id)}
                  onChange={() => handleEdit(child.id)}
                />
                <div className={'basket-model__catalog-block'}>
                  <Image
                    src={child?.avatar || '/img/static/default-avatar.png'}
                    width={24}
                    height={24}
                    style={{ objectFit: 'cover' }}
                    alt={`${child?.last_name} ${child?.first_name}`}
                  />
                  <p>{child?.first_name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
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
