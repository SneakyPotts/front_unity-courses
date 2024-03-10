import React, { useContext } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { formattedPrice } from '@assets/utils'
import { appContext } from '@components/Context/context'
import { revalidateCourses } from '@http/profile/actions'

import { Button } from '_ui/Button'
import { Modal } from '_ui/Modal'

import type { ChildBoughtModalProps } from './ChildBoughtModal.props'

export function ChildBoughtModal({ onClose }: ChildBoughtModalProps) {
  const { basket, setBasket } = useContext(appContext)

  const { width } = useWindowSize()
  const isDesktop = width > 991

  const handleClose = async () => {
    // setBasket([])
    await revalidateCourses()
    onClose()
  }

  return (
    <Modal
      variant="childBought"
      title="Заявка на курс"
      onClose={isDesktop ? handleClose : undefined}
      onBack={isDesktop ? undefined : handleClose}
    >
      <div className={'child-bought__block'}>
        <p className={'child-bought__block-text'}>Батькам було відправлено заявку на придбання курсу </p>
        <ul className={'child-bought__list'}>
          {basket?.map((item) => (
            <li key={item.id}>
              <span>x1</span>
              <p>{item.title}</p>
              <p className={'child-bought__list-price'}>{!!item.price ? `${formattedPrice(item.discount || item.price)} ₴` : 'Безкоштовно'}</p>
            </li>
          ))}
        </ul>
        <div className={'child-bought__buttons'}>
          <Button onClick={handleClose}>головна</Button>
        </div>
      </div>
    </Modal>
  )
}
