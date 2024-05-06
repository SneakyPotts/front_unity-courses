import classNames from 'classnames'
import React, { useMemo, useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { dynamicOptions } from '@assets/constants'
import { DeadlinePicker } from '@components/DeadlinePicker'
import { ExternalLinkEditor } from '@components/ExternalLinkEditor'
import { MarkSelect } from '@components/MarkSelect'
import { useQueryTeacherExam } from '@http/teacher/client.exam'
import { useTeacherNotifications } from '@http/teacher/client.notifications'

import { Button } from '_ui/Button'
import { toastPromise } from '_ui/ToastUtils'

import type { ExamTeacherTestTabProps } from './ExamTeacherTestTab.props'

const AssemblyContent = dynamic(() => import('_ui/AssemblyContent').then((mod) => mod.AssemblyContent), {
  ...dynamicOptions,
  ssr: false,
})

const filterControls = ['Очікує на перевірку', 'Перевірено', 'Не здано']

export function ExamTeacherTestTab({ progress, ...exam }: ExamTeacherTestTabProps) {
  const [activeTab, setActiveTab] = useState(1)

  const { patch, setMark, allowRetake } = useQueryTeacherExam()

  const {
    remind: { mutateAsync: remind },
  } = useTeacherNotifications()

  const handleSetMark = ({ user_id, mark }: { user_id: string; mark: number }) => {
    toastPromise({
      handler: setMark({ exam_id: exam.id, user_id, mark }),
      successMessage: 'Оцінка успішно збережена',
    })
  }

  const handleAllowRetake = (id: string) => {
    toastPromise({
      handler: allowRetake({ exam_id: exam.id, student_id: id }),
      successMessage: 'Надано дозвіл на перевиконання',
    })
  }

  const handleRemind = (id: string) => {
    toastPromise({
      handler: remind({ object_id: exam.id, student_id: id, work_type: 'final_test' }),
      successMessage: 'Нагадування успішно надіслано',
    })
  }

  const studentsList = useMemo(
    () =>
      progress?.filter((v) => {
        switch (activeTab) {
          case 1:
            return v.test_progress?.status === 1
          case 2:
            return v.test_progress?.status === 3
          default:
            return v.test_progress?.status === 2 || !v.test_progress?.status
        }
      }) || [],
    [activeTab, progress],
  )

  return (
    <div className="lesson-section__block">
      <div className="lesson-section__lable --deadline">
        <p>Дедлайн</p>
        <DeadlinePicker
          deadline={exam?.deadline}
          handler={(date) => patch({ exam_id: exam.id, deadline: date })}
        />
      </div>
      <div className="lesson-section__info">
        <div className="lesson-section__text">
          <div className="text-wrapp">
            <AssemblyContent content={exam.content} />
          </div>
        </div>
      </div>

      {exam?.test_type === 'EXT' && (
        <ExternalLinkEditor
          title={'Зробіть самостійна роботу'}
          label={'Посилання на Google Клас'}
          buttonContent={'Перейти до тесту'}
          initialLink={exam?.external_link}
          handler={(externalLink) => patch({ exam_id: exam.id, external_link: externalLink })}
        />
      )}

      <div className="lesson-section__section">
        <div className="lesson-section__text__box-tab">
          <h2>Оцінка за виконану роботу</h2>
          <div className="lesson-section__text-tabs tabs">
            {filterControls.map((v, i) => (
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
              {!!studentsList?.length ? (
                studentsList.map((v) => (
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
                      {activeTab === 1 &&
                        (exam.test_type === 'EXT' ? (
                          <MarkSelect handler={(mark: number) => handleSetMark({ user_id: v.id, mark })} />
                        ) : (
                          <Button
                            variant="border"
                            href={`/check/exam/${v.test_progress.id}`}
                            target="_blank"
                          >
                            Перевірити
                          </Button>
                        ))}
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
                          variant={!v.test_progress?.status ? 'border' : v.test_progress?.status === 2 ? 'gray' : undefined}
                          onClick={!v.test_progress?.status ? () => handleRemind(v.id) : undefined}
                        >
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
