import React from 'react'
import { toast } from 'react-toastify'

export const successIcon = {
  icon: (
    <svg>
      <use href="/img/sprite.svg#check"></use>
    </svg>
  ),
}

export const pendingIcon = {
  icon: (
    <svg>
      <use href="/img/sprite.svg#courses-clock"></use>
    </svg>
  ),
}

export const errorIcon = {
  icon: (
    <svg>
      <use href="/img/sprite.svg#cross"></use>
    </svg>
  ),
}

export const infoIcon = {
  icon: (
    <svg>
      <use href="/img/sprite.svg#цфкт"></use>
    </svg>
  ),
}

export const toastPromise = ({
  handler,
  successMessage = 'Данні успішно збережені',
  successCallback,
  errorMessage = 'Вибачте, виникла помилка обробці даних',
  pendingMessage = 'Зачекайте, данні обробляються',
}: {
  handler: Promise<any>
  successMessage?: string
  successCallback?: () => void
  errorMessage?: string
  pendingMessage?: string
}) => {
  toast.promise(handler, {
    pending: {
      render: pendingMessage,
      ...pendingIcon,
    },
    success: {
      render() {
        successCallback && successCallback()
        return successMessage
      },
      ...successIcon,
    },
    error: {
      render: errorMessage,
      ...errorIcon,
    },
  })
}

// export const
