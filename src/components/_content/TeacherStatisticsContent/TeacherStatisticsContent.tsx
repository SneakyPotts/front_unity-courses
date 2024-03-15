import classNames from 'classnames'
import React, { useState } from 'react'

import Image from 'next/image'

import { DetailPopup } from '@components/DetailPopup'
import { MarkSelect } from '@components/MarkSelect'
import { useQueryTeacherStats } from '@http/teacher/client.statistics'

import { Loader } from '_ui/Loader'
import { RequestError } from '_ui/RequestError'
import { toastPromise } from '_ui/ToastUtils'

import { ProfileInfoModal } from '_modals/ProfileInfoModal'

import type { TeacherStatisticsContentProps } from './TeacherStatisticsContent.props'

export function TeacherStatisticsContent({ data, isLoading, isError, courseId, isStudent }: TeacherStatisticsContentProps) {
  const { finalMark } = useQueryTeacherStats({})

  const [profileModalId, setProfileModalId] = useState('')

  const handleSetFinalMark = (data: { mark: number; student_id: string }) => {
    courseId &&
      toastPromise({
        handler: finalMark({ course_id: courseId, ...data }),
        successMessage: 'Оцінка успішно збережена',
      })
  }

  return (
    <div className="marks-table">
      <div className="marks-table__inner">
        <div className="marks-table__bottom">
          <div className="marks-table__table table">
            <div className="table__wrapper">
              <div className="table__head">
                <div className="table__row">
                  <div className="table__th table__th--subjects">Учні</div>
                  <div className="table__th table__th--marks">Оцінки</div>
                  <div className="table__th table__th--semester">Фінальна оцінка</div>
                </div>
              </div>
              <div className="table__body">
                {isLoading && <Loader />}
                {isError && <RequestError />}
                {!isLoading &&
                  !isError &&
                  data?.map((i) => (
                    <div
                      key={i.id}
                      className="table__row"
                    >
                      <div
                        className="table__subject student-name"
                        onClick={() => setProfileModalId(i.id)}
                      >
                        <Image
                          src={('avatar' in i && i.avatar) || ('cover' in i && i.cover) || '/img/static/default-avatar.png'}
                          width={30}
                          height={30}
                          style={{ objectFit: 'cover' }}
                          alt={('first_name' in i && `${i.first_name} ${i.last_name}`) || ('title' in i && `${i.title}`) || 'avatar'}
                        />
                        <p>{('first_name' in i && `${i.first_name} ${i.last_name}`) || ('title' in i && `${i.title}`)}</p>

                        {/*{profileModalId === i.id && (*/}
                        {/*  <ProfileInfoModal*/}
                        {/*    onClose={() => setProfileModalId('')}*/}
                        {/*    studentId={i.id}*/}
                        {/*  />*/}
                        {/*)}*/}
                      </div>

                      <ul className="table__marks">
                        {i.marks.map((j: any) => (
                          // <DetailPopup
                          //   key={j.mark_id}
                          //   type="stats"
                          //   id={j.mark_id}
                          // >
                          <li
                            key={j.mark_id}
                            className={classNames('table__mark', {
                              'table__mark--control-work': false,
                              'table__mark--thematic': false,
                            })}
                          >
                            {j.mark}
                          </li>
                          // </DetailPopup>
                        ))}
                      </ul>

                      {i.final_mark || isStudent ? (
                        <DetailPopup
                          type="string"
                          title="Фінальна оцінка за курс"
                        >
                          <div className={classNames('table__total', { 'table__total--forecast': false })}>{i.final_mark}</div>
                        </DetailPopup>
                      ) : (
                        <MarkSelect
                          className="teacher-stats__final table__total"
                          handler={(mark) => handleSetFinalMark({ mark, student_id: i.id })}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="table__legend">
              <span className="table__legend-text">Умовні позначення:</span>
              <ul className="table__list">
                <li className="table__item">
                  <div className="table__mark">10</div>
                  <div className="table__tip">- за урок, д/з, додаткова</div>
                </li>
                <li className="table__item">
                  <div className="table__mark table__mark--control-work">10</div>
                  <div className="table__tip">- за к/р</div>
                </li>
                <li className="table__item">
                  <div className="table__mark table__mark--thematic">10</div>
                  <div className="table__tip">- за тему</div>
                </li>
                <li className="table__item">
                  <div className="table__total table__total--forecast">10</div>
                  <div className="table__tip">- прогноз за курс</div>
                </li>
                <li className="table__item">
                  <div className="table__total">10</div>
                  <div className="table__tip">- поставлена за курс</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
