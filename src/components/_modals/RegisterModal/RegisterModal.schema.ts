import { z } from 'zod'

import { messages, requiredString } from '@assets/constants/validationRules'

export const schema = z
  .object({
    first_name: requiredString,
    last_name: requiredString,
    email: requiredString.email(messages.invalid_email),
    password: requiredString,
    confirm_password: requiredString,
  })
  .refine(
    (data) => {
      if (data.password) {
        return data.password === data.confirm_password
      }
      return true
    },
    {
      path: ['confirm_password'],
      message: 'Введені паролі не співпадають',
    },
  )
