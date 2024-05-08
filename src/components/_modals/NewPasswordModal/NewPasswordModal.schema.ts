import { z } from 'zod'

import { requiredString } from '@assets/constants/validationRules'

export const schema = z
  .object({
    new_password: z.string().min(8, { message: 'Менше 8 символів' }),
    confirm_password: requiredString,
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Введені паролі не співпадають',
  })
