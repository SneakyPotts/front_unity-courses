import { z } from 'zod'

import { requiredString } from '@assets/constants/validationRules'

export const schema = z
  .object({
    old_password: requiredString,
    new_password: z.string().min(8, { message: 'Менше 8 символів' }),
    confirm_password: requiredString,
  })
  .refine((data) => data.old_password !== data.new_password, {
    path: ['new_password'],
    message: 'Новий пароль має відрізнятись від старого',
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Введені паролі не співпадають',
  })
