import type { TClass, TDocument, THuman, TTeacher } from '@assets/types/globals'

/*profile*/
export type TRole = 1 | 2 | 3 | 10 | 20 | 30 | 31 | 100

export type TAboutMe = THuman & {
  id: string
  role: TRole
  status: number
  avatar_uploaded_at: string
  avatar_can_be_updated: string
  teacher_profile: TTeacherRegistration
  student_profile: any
  parent_profile: TParentRegistration
}
/*profile*/

/*common*/
export type TExtendHuman = THuman & {
  date_of_birth: string
  gender: string
  phone: string
  email: string
  city: string
  address: string
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
  course_title: string
  student: TTeacher
  lectors: TTeacher[]
  end_date: string
  final_mark: number
  certificate: string
}
/*certificates*/
