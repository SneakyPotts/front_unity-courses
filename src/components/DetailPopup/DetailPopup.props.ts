import React from 'react'

// import { TStudentSchedule } from '@store/student/types'

export interface DetailPopupProps {
  type: 'string' | 'lesson' | 'stats'
  children: React.ReactNode
  title?: string
  id?: string
  // data?: TStudentSchedule & { subject_title?: string; subject_id?: string } & { [key: string]: any }
  role?: 'student' | 'teacher'
  forParent?: boolean
}
