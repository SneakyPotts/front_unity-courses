import { differenceInSeconds, format, parseISO } from 'date-fns'
import React, { useLayoutEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import { dynamicOptions } from '@assets/constants'
import { UploadDocumentItem, UploadDocumentModal } from '@components/UploadDocument'
import { useQueryStudentLesson } from '@http/student/client.lesson'

import { Button } from '_ui/Button'

import type { SelfWorkTabContentProps } from './SelfWorkTabContent.props'

const AssemblyContent = dynamic(() => import('_ui/AssemblyContent').then((mod) => mod.AssemblyContent), {
  ...dynamicOptions,
  ssr: false,
})

const TextEditor = dynamic(() => import('@components/TextEditor').then((mod) => mod.TextEditor), {
  ...dynamicOptions,
  ssr: false,
})

export function SelfWorkTabContent({ selfWork }: SelfWorkTabContentProps) {
  const [text, setText] = useState<string>(selfWork?.progress?.student_answer || '')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const isUpload = !selfWork?.progress?.block_timestamp || isEditing
  // const hwMark = marks?.find((i) => i.mark_type === 34)?.mark

  const { sendTextSelfWork, sendFileSelfWork, deleteFileSelfWork, sendSelfConfirm } = useQueryStudentLesson({})

  const onSubmit = async () => {
    setError('')

    if (selfWork?.progress_type === 1) {
      if (!isUpload) {
        setIsEditing(true)
      } else {
        if (!text?.length) {
          setError("Це обов'язкове поле")
          return
        }
        try {
          await sendTextSelfWork({ self_id: selfWork.id, student_answer: text })
          await sendSelfConfirm({ self_id: selfWork.id })
          setIsEditing(false)
        } catch (err) {
          setError('Щось пішло не так')
        }
      }
    } else if (selfWork?.progress_type === 2) {
      setIsOpen(true)
    }
  }

  const SubmitBtn = () => {
    const [timer, setTimer] = useState('')

    const submitTitle = selfWork?.progress_type === 1 ? 'Відправити роботу' : 'Завантажити роботу'

    useLayoutEffect(() => {
      const updateTimer = () => {
        if (selfWork?.progress?.block_timestamp) {
          const timeForEdit = parseISO(selfWork?.progress?.block_timestamp)
          const difference = differenceInSeconds(timeForEdit, new Date())

          if (difference > 0) {
            const minutes = Math.floor(difference / 60)
            const seconds = difference % 60

            const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

            setTimer(formattedTime)
          } else {
            setTimer('00:00')
          }
        }
      }

      updateTimer()

      const interval = setInterval(updateTimer, 1000)

      return () => clearInterval(interval)
    }, [])

    return (
      <div className="lesson-section__edit">
        {timer !== '00:00' && (
          <Button
            variant={isUpload ? 'accent' : 'border'}
            onClick={onSubmit}
            // disabled={textLoading || confirmLoading}
          >
            <svg className="btn__icon">
              <use href={`/img/sprite.svg#${isUpload ? 'home' : 'pensil'}`}></use>
            </svg>
            {isUpload ? submitTitle : 'Редагувати'}
          </Button>
        )}
        {!isUpload && timer && (
          <span className="lesson-section__change-timer">
            {/*{timer === '00:00' ? (!selfWork?.teacher_reply ? '(закінчився час на редагування)' : null) : `(залишилось ${timer})`}*/}
            {timer === '00:00' ? '(закінчився час на редагування)' : `(залишилось ${timer})`}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="lesson-section__section">
      <h2 className="lesson-section__title">Моя домашня робота</h2>

      {/* Поле для ввода */}
      {selfWork?.progress_type === 1 && (
        <div className="lesson-section__case">
          {isUpload ? (
            <TextEditor
              version={4}
              initData={text}
              onChange={setText}
            />
          ) : (
            <AssemblyContent content={selfWork.progress.student_answer} />
          )}

          {error && <p className="error">{error}</p>}

          <SubmitBtn />
        </div>
      )}

      {/* Загрузка файлов */}
      {selfWork?.progress_type === 2 && (
        <div className="lesson-section__case">
          {!!selfWork?.progress?.files?.length && (
            <div className={'lesson-section__document-block document-block'}>
              <ul className="document-block__list w-full">
                {selfWork?.progress?.files?.map((i) => (
                  <UploadDocumentItem
                    key={i.id}
                    name={i.name}
                    link={i.file}
                    type="download"
                  />
                ))}
              </ul>
            </div>
          )}

          <SubmitBtn />

          {isOpen && (
            <UploadDocumentModal
              docType={10}
              docList={selfWork?.progress?.files}
              onClose={() => setIsOpen(false)}
              handleUpload={(data) => sendFileSelfWork({ self_id: selfWork.id, body: data })}
              handleRemoveItem={(id) => deleteFileSelfWork({ self_id: selfWork.id, file_id: id })}
              handleSubmit={() => sendSelfConfirm({ self_id: selfWork.id }).then(() => setIsOpen(false))}
            />
          )}
        </div>
      )}

      {/* Teacher reply */}
      {!!selfWork?.progress?.teacher_reply && (
        <div className="lesson-section__reply">
          <div className="lesson-section__reply-flex">
            <div className="lesson-section__reply-date">{format(new Date(selfWork.progress?.teacher_reply_timestamp), 'dd.MM.yyyy HH:mm')}</div>
            {selfWork?.progress?.mark && (
              <div className="lesson-section__reply-mark-wrapper">
                <span className="lesson-section__reply-title">Оцінка:</span>
                <span className="lesson-section__reply-mark">{selfWork.progress.mark}</span>
              </div>
            )}
          </div>
          <p className="lesson-section__reply-title">Коментар до роботи:</p>
          <AssemblyContent
            className="lesson-section__reply-text"
            content={selfWork.progress.teacher_reply}
          />
        </div>
      )}
    </div>
  )
}
