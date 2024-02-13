import { format } from 'date-fns'
import React, { useState } from 'react'

import { Loader } from '@UI/Loader'
import { Modal } from '@UI/Modal'

import type { ProfileInfoModalProps } from './ProfileInfoModal.props'

export function ProfileInfoModal({ onClose, studentId, teacherId }: ProfileInfoModalProps) {
  // const { data: student, isLoading: studentIsLoading, isError: studentIsError } = useGetStudentProfileInfoQuery({ student_id: studentId! }, { skip: !studentId })
  // const { data: teacher, isLoading: teacherIsLoading, isError: teacherIsError } = useGetTeacherProfileInfoQuery({ teacher_id: teacherId! }, { skip: !teacherId })

  const data = !0

  const [showTeacher, setShowTeacher] = useState(false)

  return (
    <Modal
      // title={studentIsLoading || teacherIsLoading ? 'Завантаження...' : `${data?.last_name} ${data?.first_name} ${data?.patronymic}`}
      title={'Завантаження...'}
      variant={'studentCard'}
      onClose={onClose}
    >
      {/*{(studentIsLoading || teacherIsLoading) && <Loader />}*/}
      {/*{(studentIsError || teacherIsError) && <p className="text-center">Щось пішло не так...</p>}*/}

      {data && (
        <p>
          <h1>ProfileModal</h1>
        </p>
        // <div className="modal__card">
        //   <div className="modal__card-image">
        //     <img
        //       className="modal__card-img"
        //       src={data?.avatar || '/img/static/default-avatar.png'}
        //       alt={data?.last_name}
        //       onError={({ currentTarget }) => {
        //         currentTarget.onerror = null
        //         currentTarget.src = '/img/static/default-avatar.png'
        //       }}
        //     />
        //   </div>
        //   <ul className="personal-cabinet__list modal__cabinet--list">
        //     {teacher && (
        //       <li className="personal-cabinet__item">
        //         <div className="personal-cabinet__wrapper">
        //           <span className="personal-cabinet__label">Викладач</span>
        //           <div className="personal-cabinet__line"></div>
        //           <span className="personal-cabinet__value">{teacher?.qualification}</span>
        //         </div>
        //       </li>
        //     )}
        //     <li className="personal-cabinet__item">
        //       <div className="personal-cabinet__wrapper">
        //         <span className="personal-cabinet__label">Дата народження</span>
        //         <div className="personal-cabinet__line"></div>
        //         <time className="personal-cabinet__value">{data?.date_of_birth && format(new Date(data.date_of_birth), 'dd.MM.yyyy')}</time>
        //       </div>
        //     </li>
        //     {/*<li className="personal-cabinet__item">*/}
        //     {/*  <div className="personal-cabinet__wrapper">*/}
        //     {/*    <span className="personal-cabinet__label">Стать</span>*/}
        //     {/*    <div className="personal-cabinet__line"></div>*/}
        //     {/*    <span className="personal-cabinet__value">{data?.gender === 'F' ? 'жічноча' : 'чоловіча'}</span>*/}
        //     {/*  </div>*/}
        //     {/*</li>*/}
        //     <li className="personal-cabinet__item">
        //       <div className="personal-cabinet__wrapper">
        //         <span className="personal-cabinet__label">Місто</span>
        //         <div className="personal-cabinet__line"></div>
        //         <span className="personal-cabinet__value">{data?.city}</span>
        //       </div>
        //     </li>
        //     <li className="personal-cabinet__item">
        //       <div className="personal-cabinet__wrapper">
        //         <span className="personal-cabinet__label">Клас</span>
        //         <div className="personal-cabinet__line"></div>
        //         <span className="personal-cabinet__value">{student?.classroom[0].name || teacher?.classroom.join(', ') || '-'}</span>
        //       </div>
        //     </li>
        //   </ul>
        //
        //   {student && (
        //     <>
        //       <h3 className="modal__title-info">Класний керівник</h3>
        //       <div className="modal__info">
        //         <div className="modal__name">
        //           <img
        //             className="modal__photo-teacher"
        //             src={student?.classroom[0].teacher.avatar || '/img/static/default-avatar.png'}
        //             alt={student?.classroom[0].teacher.last_name}
        //             onError={({ currentTarget }) => {
        //               currentTarget.onerror = null
        //               currentTarget.src = '/img/static/default-avatar.png'
        //             }}
        //           />
        //           <div className="modal__card-block">
        //             <p
        //               className="modal__card-name"
        //               onClick={() => setShowTeacher(true)}
        //             >
        //               {`${student?.classroom[0].teacher.last_name} ${student?.classroom[0].teacher.first_name} ${student?.classroom[0].teacher.patronymic}`}
        //             </p>
        //             <p className="modal__card-teacher">{student?.classroom[0].teacher.qualification}</p>
        //           </div>
        //         </div>
        //         <button className="modal__card-btn">
        //           <svg className="modal__info-svg">
        //             <use href="/img/sprite.svg#message"></use>
        //           </svg>
        //           Написати
        //         </button>
        //       </div>
        //       {showTeacher && (
        //         <ProfileInfoModal
        //           onClose={() => setShowTeacher(false)}
        //           teacherId={student?.classroom[0].teacher.id}
        //         />
        //       )}
        //     </>
        //   )}
        // </div>
      )}
    </Modal>
  )
}
