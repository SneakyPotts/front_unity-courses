import { THuman } from '@/http/global.type'

export type TRole = 1 | 2 | 10 | 20 | 30 | 31 | 100

export type TAboutMe = THuman & {
  id: string
  role: TRole
  status: number
  avatar_uploaded_at: Date
  avatar_can_be_updated: Date
  teacher_profile: any
  student_profile: any
  parent_profile: any
}
