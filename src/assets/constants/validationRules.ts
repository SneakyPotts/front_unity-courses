import { parsePhoneNumber } from 'libphonenumber-js'
import { z } from 'zod'

export const messages = {
  invalid_email: 'Некоректний email',
}

export const requiredString = z.string().trim().min(1, { message: "Це обов'язкове поле" })

export const phoneNumber = z.string().refine(
  (v) => {
    const number = v.replace(/[^\d+]/g, '')
    return number.length === 13 && parsePhoneNumber(number, 'UA')?.isValid()
  },
  {
    message: 'Коректний формат номеру +38(0**)***-**-**',
  },
)
