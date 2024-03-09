import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { imgBlur } from '@assets/utils'
import { DeadlinePicker } from '@components/DeadlinePicker'
import { ExternalLinkEditor } from '@components/ExternalLinkEditor'
import { MarkSelect } from '@components/MarkSelect'
import { useQueryTeacherLesson } from '@http/teacher/client.lesson'
import { TStudentTestProgress } from '@http/teacher/types'

import { Button } from '_ui/Button'
import { Loader } from '_ui/Loader'
import { RequestError } from '_ui/RequestError'

import type { TeacherTestWorkTabProps } from './TeacherTestWorkTab.props'

const onlineFilterControls = ['Очікує на перевірку', 'Перевірено', 'Не здано']

export function TeacherTestWorkTab({ testId }: TeacherTestWorkTabProps) {
  const {
    test: { data, isLoading, isError },
    editTest,
    testMark,
    retakeTest,
  } = useQueryTeacherLesson({ test_id: testId })

  const [activeTab, setActiveTab] = useState(1)
  const [filteredStudents, setFilteredStudents] = useState<TStudentTestProgress[]>([])

  useEffect(() => {
    data?.progress &&
      setFilteredStudents(
        data.progress.filter((v) => {
          switch (activeTab) {
            case 1:
              return v.test_progress?.status === 1
            case 2:
              return v.test_progress?.status === 3
            default:
              return v.test_progress?.status === 2 || !v.test_progress?.status
          }
        }),
      )
  }, [activeTab, data?.progress])

  if (isLoading) return <Loader />

  if (isError) return <RequestError message="Щось пішло не так..." />

  return (
    <div className="lesson-section__block">
      <div className="lesson-section__lable --deadline">
        <p>Дедлайн</p>
        <DeadlinePicker
          deadline={data?.deadline}
          handler={(date) => editTest({ test_id: testId!, deadline: date })}
        />
      </div>

      {data?.test_type !== 'INT' && (
        <ExternalLinkEditor
          title={'Зробіть самостійна роботу'}
          label={'Посилання на Google Клас'}
          buttonContent={'Перейти до тесту'}
          initialLink={data?.external_link}
          handler={(externalLink) => editTest({ test_id: testId!, external_link: externalLink })}
        />
      )}

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
              {activeTab !== 3 && data?.test_type !== 'INT' && (
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
                        {...imgBlur}
                        alt={`${v.last_name} ${v.first_name}`}
                      />
                      <p>{`${v.last_name} ${v.first_name}`}</p>
                    </div>
                    <div className="lesson__section-nav-content">
                      {activeTab === 1 &&
                        (data?.test_type === 'INT' ? (
                          <Button
                            variant="border"
                            href={`/check/test/${v.test_progress?.id}`}
                            target="_blank"
                          >
                            Перевірити
                          </Button>
                        ) : (
                          <MarkSelect handler={(mark: number) => testMark({ test_id: testId!, user_id: v.id, mark })} />
                        ))}
                      {activeTab === 2 && (
                        <>
                          {v.mark && <p className={'lesson-section__nav-grade'}>{v.mark}</p>}
                          <Button
                            variant={'border'}
                            onClick={() => retakeTest({ test_id: testId!, student_id: v.id })}
                          >
                            Дозволити перездати
                          </Button>
                        </>
                      )}
                      {activeTab === 3 && (
                        <Button variant={!v.test_progress?.status ? 'border' : v.test_progress?.status === 2 ? 'gray' : undefined}>
                          {v.test_progress?.status === 2 && 'Домашню роботу відправлено на перездачу'}
                          {!v.test_progress?.status && 'Нагадати'}
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
