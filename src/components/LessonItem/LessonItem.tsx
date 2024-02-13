import classNames from 'classnames'
import moment from 'moment'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ProfileInfoModal } from '@components/ProfileInfoModal'
import { TypesList } from '@components/TypesList'

import { Button } from '@UI/Button'

import { useVisitLessonByStudentMutation } from '@store/student/student.api'

import type { TeacherProps } from './LessonItem.props'

function Teacher({ onClick, img, name }: TeacherProps) {
  return (
    <div
      className="lesson__teacher teacher"
      onClick={onClick}
    >
      <div className="teacher__img">
        <img
          src={img}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = '/img/static/default-avatar.png'
          }}
          alt="avatar teacher"
        />
      </div>
      {name}
    </div>
  )
}

export function LessonItem({
  id,
  start_time,
  end_time,
  subject,
  subject_id,
  subject_title,
  subject_icon,
  subject_color,
  title,
  user_visited,
  teacher,
  marks,
  classroom,
  lesson_visiting,
  online_lesson_link,
  isTeacher,
  isStudent,
}: any) {
  const [visitLesson] = useVisitLessonByStudentMutation()

  const [teacherInfoShow, setTeacherInfoShow] = useState(false)

  const lessonMark = marks?.length && marks.map((item: any) => item.mark).join(', ')
  const teacherName = teacher && `${teacher.last_name} ${teacher.first_name} ${teacher.patronymic}`

  const isFinished = moment(end_time).diff(moment()) < 0
  const isWaiting = moment.duration(moment(start_time).diff(moment())).asMinutes() > 5

  const handleLessonLink = () => {
    if (isStudent) {
      visitLesson(id)
    }
    window.open(online_lesson_link, '_blank')?.focus()
  }

  return (
    <li className="schedule__lesson lesson">
      <div className="lesson__image">
        {marks?.length && <span className="lesson__mark">{lessonMark}</span>}

        <img
          src={subject_icon}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = '/img/static/default-avatar.png'
          }}
          alt={title}
        />
      </div>
      <div
        className={classNames('lesson__top', { isTeacher })}
        style={{ backgroundColor: subject_color }}
      >
        <div className="lesson__subject">
          <span className="lesson__counter"></span>
          {isStudent || isTeacher ? (
            <Link
              to={`/${isStudent ? 'student' : 'teacher'}/subject/${subject_id}`}
              className="lesson__name"
            >
              {subject ?? subject_title}
            </Link>
          ) : (
            <span className="lesson__name">{subject ?? subject_title}</span>
          )}

          {isTeacher && <span className="lesson__class">{classroom}</span>}
        </div>

        {!isTeacher && (
          <>
            <span className="lesson__point"></span>
            <Teacher
              onClick={() => setTeacherInfoShow(true)}
              img={teacher?.avatar}
              name={teacherName}
            />
          </>
        )}

        {isTeacher && isFinished && lesson_visiting && (
          <span className={'lesson__presence'}>
            Присутність {lesson_visiting.students_visited}/{lesson_visiting.students_total} ({lesson_visiting.percentage}%)
          </span>
        )}

        {!isTeacher && <TypesList className={'lesson__right'} />}
      </div>
      <div className="lesson__text">
        {isTeacher || isStudent ? <Link to={`/${isStudent ? 'student' : 'teacher'}/lesson?subjectId=${subject_id}&lessonId=${id}`}>{title}</Link> : <span>{title}</span>}
      </div>
      <div className="lesson__functional">
        <div className="lesson__times">
          <time className="lesson__time">{moment(start_time).format('HH-mm')}</time>-<time className="lesson__time">{moment(end_time).format('HH-mm')}</time>
        </div>

        {isFinished && (isTeacher || isStudent) && (
          <Button
            className={'lesson__button'}
            variant={'gray'}
          >
            <svg className="btn__icon">
              <use href={`/img/sprite.svg#${user_visited ? 'check' : 'close'}`}></use>
            </svg>
            {user_visited ? 'Пройшов' : 'Пропущено'}
          </Button>
        )}

        {!isFinished && (isTeacher || isStudent) && (
          <Button
            className={'lesson__button'}
            variant={'accent'}
            disabled={isWaiting}
            onClick={handleLessonLink}
          >
            <svg className="btn__icon">
              <use href={`/img/sprite.svg#${isWaiting ? 'time' : 'webcam'}`}></use>
            </svg>
            {isWaiting ? 'Очікується' : 'Перейти'}
          </Button>
        )}
      </div>

      {teacherInfoShow && (
        <ProfileInfoModal
          onClose={() => setTeacherInfoShow(false)}
          teacherId={teacher?.id}
        />
      )}
    </li>
  )
}
