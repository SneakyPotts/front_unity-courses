import { z } from 'zod'

import { messages, requiredString } from '@assets/constants/validationRules'

export const schema = z.object({
  email: requiredString.email(messages.invalid_email),
  password: requiredString,
})
