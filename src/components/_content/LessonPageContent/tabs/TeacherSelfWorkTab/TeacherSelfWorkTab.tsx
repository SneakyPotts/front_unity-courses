import classNames from 'classnames'
import React, { useMemo, useState } from 'react'

import Image from 'next/image'

import { DeadlinePicker } from '@components/DeadlinePicker'
import { useQueryTeacherLesson } from '@http/teacher/client.lesson'
import { useTeacherNotifications } from '@http/teacher/client.notifications'

import { Button } from '_ui/Button'
import { Loader } from '_ui/Loader'
import { RequestError } from '_ui/RequestError'
import { toastPromise } from '_ui/ToastUtils'

import type { TeacherSelfWorkTabProps } from './TeacherSelfWorkTab.props'

const onlineFilterControls = ['Очікує на перевірку', 'Перевірено', 'Не здано']

export function TeacherSelfWorkTab({ selfId }: TeacherSelfWorkTabProps) {
  const {
    self: { data, isLoading, isError },
    editSelf,
    retakeSelf,
  } = useQueryTeacherLesson({ self_id: selfId })

  const {
    remind: { mutateAsync: remind },
  } = useTeacherNotifications()

  const [activeTab, setActiveTab] = useState(1)

  const handleAllowRetake = (id: string) => {
    toastPromise({
      handler: retakeSelf({ self_id: selfId!, student_id: id }),
      successMessage: 'Надано дозвіл на перевиконання',
    })
  }

  const handleRemind = (id: string) => {
    toastPromise({
      handler: remind({ object_id: selfId!, student_id: id, work_type: 'self_work' }),
      successMessage: 'Нагадування успішно надіслано',
    })
  }

  const filteredStudents = useMemo(() => {
    if (!!data?.progress) {
      return data?.progress.filter((v) => {
        switch (activeTab) {
          case 1:
            return v.work_progress?.status === 1
          case 2:
            return v.work_progress?.status === 3
          default:
            return v.work_progress?.status === 2 || !v.work_progress?.status
        }
      })
    }

    return []
  }, [activeTab, data?.progress])

  if (isLoading) return <Loader />

  if (isError) return <RequestError message="Щось пішло не так..." />

  if (data)
    return (
      <div className="lesson-section__block">
        <div className="lesson-section__lable --deadline">
          <p>Дедлайн</p>
          <DeadlinePicker
            deadline={data?.deadline}
            handler={(date) => editSelf({ self_id: selfId!, deadline: date })}
          />
        </div>

        <div className="lesson-section__section">
          <div className="lesson-section__text__box-tab">
            <h2>Оцінка за виконану роботу</h2>
            <div className="lesson-section__text-tabs tabs">
              {onlineFilterControls.map((v, i) => (
                <div
                  key={v}
                  className={classNames('lesson-section__text-tab tab', { active: activeTab === i + 1 })}
                  onClick={() => setActiveTab(i + 1)}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
          <div className="lesson-section__result">
            <div className="lesson-section__content-tab tab-content active">
              <ul className={classNames({ 'lesson-section__content-nav': activeTab === 1, 'lesson-section__info-top': [2, 3].includes(activeTab) })}>
                <li className="lesson-section__content-nav-item">Учні</li>
                {activeTab !== 3 && (
                  <li
                    className="lesson-section__content-nav-item"
                    style={{ paddingRight: activeTab === 2 ? 265 : 0 }}
                  >
                    Оцінка
                  </li>
                )}
              </ul>
              <ul className="lesson-section__content-nav-list">
                {!!filteredStudents?.length ? (
                  filteredStudents.map((v) => (
                    <li
                      key={v.id}
                      className="lesson-section__content__nav-list-item"
                    >
                      <div className="lesson__section__expectation-profil">
                        <Image
                          className="lesson-section__expectation-img"
                          src={v.avatar || '/img/static/default-avatar.png'}
                          width={50}
                          height={50}
                          alt={`${v.last_name} ${v.first_name}`}
                        />
                        <p>{`${v.last_name} ${v.first_name}`}</p>
                      </div>
                      <div className="lesson__section-nav-content">
                        {activeTab === 1 && (
                          <Button
                            variant="border"
                            href={`/check/self/${v.work_progress?.id}`}
                            target="_blank"
                          >
                            Перевірити
                          </Button>
                        )}
                        {activeTab === 2 && (
                          <>
                            {v.mark && <p className={'lesson-section__nav-grade'}>{v.mark}</p>}
                            <Button
                              variant={'border'}
                              onClick={() => handleAllowRetake(v.id)}
                            >
                              Дозволити перездати
                            </Button>
                          </>
                        )}
                        {activeTab === 3 && (
                          <Button
                            variant={!v.work_progress?.status ? 'border' : v.work_progress?.status === 2 ? 'gray' : undefined}
                            onClick={!v.work_progress?.status ? () => handleRemind(v.id) : undefined}
                          >
                            {v.work_progress?.status === 2 && 'Домашню роботу відправлено на перездачу'}
                            {!v.work_progress?.status && 'Нагадати'}
                          </Button>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-center">Список пустий...</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}
