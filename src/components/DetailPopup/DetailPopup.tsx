import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { useWindowSize } from 'usehooks-ts'

import { Portal } from '@components/Portal'
import { TypesList } from '@components/TypesList'

import type { DetailPopupProps } from './DetailPopup.props'

export function DetailPopup({ type, children, title, id, data, role = 'student', forParent }: DetailPopupProps) {
  const { width } = useWindowSize()
  const isDesktop = width > 991

  const referenceRef = useRef<HTMLDivElement | null>(null)
  const popperRef = useRef<HTMLDivElement | null>(null)

  const [referenceElement, setReferenceElement] = useState<any>(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isAnimate, setIsAnimate] = useState<boolean>(false)
  const [showTeacherModal, setShowTeacherModal] = useState<boolean>(false)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: type === 'string' ? 'left-start' : 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, -1] } }],
  })

  // const markData = useGetStudentMarkDetailQuery({ mark_id: id }, { skip: type !== 'stats' || !isOpen })

  // const teacherAvatar = markData?.data?.subject?.teacher?.avatar || data?.teacher?.avatar || '/img/static/default-avatar.png'
  // const teacherName =
  //   type === 'stats'
  //     ? `${markData?.data?.subject?.teacher?.last_name} ${markData?.data?.subject?.teacher?.first_name} ${markData?.data?.subject?.teacher?.patronymic}`
  //     : `${data?.teacher?.last_name} ${data?.teacher?.first_name} ${data?.teacher?.patronymic}`

  const Content = () => {
    if (type === 'string' && !!title) {
      return <div className="detail-popup">{title}</div>
    }

    // if (markData.isLoading) {
    //   return (
    //     <div className="lesson-modal__content">
    //       <Loader />
    //     </div>
    //   )
    // }
    //
    // if (markData.error) {
    //   return <div className="lesson-modal__content">error</div>
    // }

    return (
      <div
        className={classNames('lesson-modal__content', {
          'lesson-modal__content--hide': isAnimate,
        })}
        onClick={(ev) => ev.stopPropagation()}
      >
        {type === 'stats' && <div className="lesson-modal__num">{/*<span>{markData?.data?.mark}</span>— {markData?.data?.title}*/}</div>}
        <div
          className="lesson-modal__top"
          style={{ backgroundColor: data?.subject_color }}
        >
          <div className="lesson-modal__subject">
            {/* {type === 'lesson' && <span className="lesson-modal__counter"></span>} */}
            {/*{forParent ? (*/}
            {/*  <span className="lesson-modal__name">{markData?.data?.subject?.title || data?.subject || data?.subject_title}</span>*/}
            {/*) : (*/}
            {/*  <Link*/}
            {/*    to={`/${role}/subject/${markData?.data?.subject?.id || data?.subject_id}`}*/}
            {/*    className="lesson-modal__name"*/}
            {/*  >*/}
            {/*    {markData?.data?.subject?.title || data?.subject || data?.subject_title}*/}
            {/*  </Link>*/}
            {/*)}*/}
            {/*{type === 'stats' && <time className="lesson-modal__date">{moment(markData?.data?.mark_date).format('DD.MM.YYYY H:mm')}</time>}*/}
          </div>
          {role === 'student' && (
            <div
              className="lesson-modal__teacher teacher"
              onClick={() => setShowTeacherModal(true)}
            >
              {/*<div className="teacher__img">*/}
              {/*  <img*/}
              {/*    src={teacherAvatar}*/}
              {/*    alt="Avatar"*/}
              {/*  />*/}
              {/*</div>*/}
              {/*{teacherName}*/}
            </div>
          )}
        </div>
        <div className="lesson-modal__bottom">
          <div className="lesson-modal__image">
            {type === 'lesson' && data?.avg_mark && <span className="lesson-modal__mark">{data.avg_mark}</span>}
            {/*{type === 'stats'*/}
            {/*  ? markData?.data?.subject?.icon && (*/}
            {/*    <img*/}
            {/*      src={markData?.data.subject.icon}*/}
            {/*      alt="subject icon"*/}
            {/*    />*/}
            {/*  )*/}
            {/*  : data?.subject_icon && (*/}
            {/*    <img*/}
            {/*      src={data?.subject_icon}*/}
            {/*      alt="subject icon"*/}
            {/*    />*/}
            {/*  )}*/}
          </div>

          <div className="lesson-modal__text">
            {/*{forParent ? (*/}
            {/*  <span>{markData?.data?.instance_title || data?.title}</span>*/}
            {/*) : (*/}
            {/*  <Link to={`/${role}/lesson?subjectId=${markData?.data?.subject?.id ?? data?.subject_id}&lessonId=${markData?.data?.instance_id ?? data?.id}`}>*/}
            {/*    {markData?.data?.instance_title || data?.title}*/}
            {/*  </Link>*/}
            {/*)}*/}
          </div>
        </div>
        {type === 'lesson' && (
          <div className="lesson-modal__buttons">
            <div className="lesson-modal__times">
              {/*<time className="lesson-modal__time">{moment(data?.start_time).format('H:mm')}</time>-*/}
              {/*<time className="lesson-modal__time">{moment(data?.end_time).format('H:mm')}</time>*/}
            </div>
            <div className="lesson-modal__right types">
              <TypesList data={data?.lesson_icons} />
            </div>
          </div>
        )}
      </div>
    )
  }

  const handleClose = () => {
    setIsAnimate(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsAnimate(false)
    }, 200)
  }

  return (
    <>
      <div
        onMouseEnter={() => isDesktop && setIsOpen(true)}
        onMouseLeave={() => isDesktop && setIsOpen(false)}
        onClick={() => !isDesktop && type !== 'string' && setIsOpen(true)}
      >
        <div
          ref={(ref) => {
            referenceRef.current = ref
            setReferenceElement(ref)
          }}
        >
          {children}
        </div>

        {isOpen && (
          <Portal>
            <div
              ref={(ref) => {
                popperRef.current = ref
                setPopperElement(ref)
              }}
              className={classNames('lesson-modal', {
                'lesson-modal--hide': isAnimate,
              })}
              style={isDesktop ? styles.popper : {}}
              {...attributes.popper}
              onClick={() => !isDesktop && handleClose()}
            >
              <Content />
            </div>
          </Portal>
        )}
      </div>

      {/*{showTeacherModal && (*/}
      {/*  <ProfileInfoModal*/}
      {/*    onClose={() => setShowTeacherModal(false)}*/}
      {/*    teacherId={data?.teacher.id || markData.data?.subject.teacher.id}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  )
}
