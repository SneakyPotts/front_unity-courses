import type { TClass, TDocument, THuman, TTeacher } from '@assets/types/globals'
import type { TCourse } from '@http/courses/type'

/*profile*/
export type TRole = 1 | 2 | 3 | 10 | 20 | 30 | 31 | 100

export type TAboutMe = THuman & {
  id: string
  role: TRole
  status: number
  avatar_uploaded_at: string
  avatar_can_be_updated: string
  personal_site: string
  facebook_profile: string
  linkedin_profile: string
  telegram_profile: string
  about_me: string
  teacher_profile: TTeacherRegistration
  student_profile: TProfile
  parent_profile: TParentRegistration
  ext_student_profile: TProfile
}

export type TProfile = Omit<THuman, 'avatar'> & {
  address: string
  city: string
  date_of_birth: string
  email: string
  phone: string
  gender: string
}
/*profile*/

/*common*/
export type TExtendHuman = THuman & {
  address: string
  city: string
  date_of_birth: string
  email: string
  phone: string
  gender: string
}
/*common*/

/*parents*/
export type TParentResponse = {
  children: Child[]
  parents: Omit<TParentRegistration, 'childs'>
}

export type TParentRegistration = TExtendHuman & {
  id: string
  documents: TDocument[]
  childs: Child[]
  second_parent: SecondParent
}

export type TParent = Omit<TExtendHuman, 'email'> & {
  old_password: string
  new_password: string
}

export interface SecondParent extends TExtendHuman {}
/*parents*/

/*children*/
export interface Child extends TExtendHuman {
  id: string
  parent_kindship: string
  documents: TDocument[]
  medical_comment: string
  parent_comment: string
}
/*children*/

/*teacher*/
export type TTeacherRegistration = TExtendHuman & {
  id: string
  qualification: string
  documents: TDocument[]
  managed_classes: TClass[]
}
/*teacher*/

/*ToDoList*/
export type TToDo = {
  id: string
  title: string
  deadline: string
  is_completed: boolean
}
/*ToDoList*/

/*basket*/
export interface TBasket {
  courses: TBasketCourse[]
}

export interface TBasketCourse {
  id: string
  title: string
  description: string
  cover: string
  price: number
  discount: number
  users: string[]
}
/*basket*/

/*certificates*/
export type TCertificates = {
  count: number
  next: string
  previous: string
  results: TCertificate[]
}

export type TCertificate = {
  id: string
  certificate_image: string
  certificate_pdf: string
  course_id: string
  course_title: string
  student: TTeacher
}

export type TCertificateById = {
  id: string
  student: TTeacher
  certificate_pdf: string
  certificate_image: string
  course: TCourse
}

export interface Course {
  id: string
  title: string
  format: string
  color: string
  cover: string
  categories_repr: string[]
  number_of_lectures: number
  duration_in_months: number
  available_days: number
  lectures_hours: number
  rating: number
  lectors: TTeacher[]
  start_date: string
  number_of_students: number
  max_number_of_students: number
  purchased: boolean
}

/*certificates*/
