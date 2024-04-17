'use client'

import { MathJax } from 'better-react-mathjax'
import { format } from 'date-fns'
import React, { useState } from 'react'

import dynamic from 'next/dynamic'

import { dynamicOptions } from '@assets/constants'
import { UploadDocumentItem } from '@components/UploadDocument'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { revalidateSelfWork } from '@http/teacher/actions'
import { useQueryTeacherLesson } from '@http/teacher/client.lesson'

import { Button } from '_ui/Button'
import { Dropdown } from '_ui/Dropdown'
import { toastPromise } from '_ui/ToastUtils'

import type { CheckSelfWorkContentProps, TeacherHomeWorkListProps } from './CheckSelfWorkContent.props'

const TextEditor = dynamic(() => import('@components/TextEditor').then((mod) => mod.TextEditor), {
  ...dynamicOptions,
  ssr: false,
})

const marks = Array.from({ length: 12 }, (_, i) => i + 1)
const types = ['jpeg', 'jpg', 'png', 'heic']

export function CheckSelfWorkContent({ data }: CheckSelfWorkContentProps) {
  const { selfMark, retakeSelf } = useQueryTeacherLesson({})

  const [isEditing, setIsEditing] = useState(!data.mark)
  const [text, setText] = useState(data.teacher_reply || '')
  const [mark, setMark] = useState(data.mark || '0')

  const handleSendReply = () => {
    toastPromise({
      handler: selfMark({ self_id: data.work_id, mark: Number(mark), reply: text, user_id: data.student.id }),
      successCallback: () => {
        setIsEditing(false)
        revalidateSelfWork().then()
      },
    })
  }

  const handleAllowRetake = () => {
    toastPromise({
      handler: retakeSelf({ self_id: data.work_id, student_id: data.student?.id }),
      successCallback: () => revalidateSelfWork(),
      successMessage: 'Надано дозвіл на перевиконання',
    })
  }

  useSetHeaderParams({ title: 'Самостійна робота' })

  return (
    <div className={'lesson-section__block'}>
      {data.progress_type !== 2 && <div className={'lesson-section__deadline'}>{format(new Date(data.answer_timestamp), 'dd.MM.yyyy HH:mm')}</div>}

      {data?.status === 2 ? (
        <div className="tests__retake">
          <p>Учню відправлено завдання на перездачу. Очікуйте на сповіщення про виконання роботи.</p>
        </div>
      ) : (
        <>
          <div className="lesson-section__info">
            <div className="lesson-section__text">
              <div className="text-wrapp">
                <h2>{`${data.student.last_name} ${data.student.first_name}`}</h2>
                {data.progress_type === 1 && (
                  <MathJax>
                    <div dangerouslySetInnerHTML={{ __html: data.student_answer || '' }} />
                  </MathJax>
                )}

                {/*{data.progress_type === 2 && !!data.files?.length && <FilesList data={data.files} />}*/}
                {data.progress_type === 2 && !!data.files?.length && (
                  <div className="lesson-section__document-block document-block">
                    <ul className="document-block__list w-full">
                      {data.files.map((v) => (
                        <UploadDocumentItem
                          key={v.id}
                          name={v.file}
                          link={v.file}
                          type="download"
                        />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lesson-section__section-block">
            <h2 className="lesson-section__title">Перевірка знань</h2>
            <div className="lesson-section__grade">
              <p>Оцінка{!isEditing && <span className={'lesson-section__box-input'}>{mark}</span>}</p>

              {isEditing && (
                <Dropdown
                  valuesList={marks}
                  value={mark}
                  onChange={(val) => setMark(val.toString())}
                />
              )}
            </div>
          </div>
          <p className="lesson-section__block-text">Коментар до роботи</p>
          <div className="lesson-section__case">
            {isEditing ? (
              <TextEditor
                version={4}
                initData={text}
                onChange={setText}
              />
            ) : (
              <MathJax>
                <div dangerouslySetInnerHTML={{ __html: data.teacher_reply || '' }} />
              </MathJax>
            )}

            {isEditing ? (
              <div className={'lesson-section__block__result-button'}>
                <Button onClick={handleSendReply}>
                  <svg className={'btn__icon'}>
                    <use href="/img/sprite.svg#home"></use>
                  </svg>
                  Відправити учню
                </Button>
                {data.mark && (
                  <Button
                    variant={'border'}
                    onClick={() => setIsEditing(false)}
                  >
                    Скасувати
                  </Button>
                )}
              </div>
            ) : (
              <div className={'lesson-section__block__result-button'}>
                <Button
                  variant={'border'}
                  onClick={() => setIsEditing(true)}
                >
                  Змінити рішення
                </Button>
                <Button
                  variant={'border'}
                  onClick={handleAllowRetake}
                >
                  Дозволити перездати
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function FilesList({ data }: TeacherHomeWorkListProps) {
  const [showSlider, setShowSlider] = useState<boolean>(false)
  const [activeSlide, setActiveSlide] = useState<number>(0)

  return (
    <div className="lesson-section__file-wrapper">
      {data.map((i, index) => (
        <div
          key={i.id}
          className="lesson-section__file"
          onClick={() => {
            setActiveSlide(index)
            setShowSlider(true)
          }}
        >
          {types.includes(i.file.split('.').reverse()[0]) && (
            <img
              src={i.file}
              alt={i.name}
            />
          )}
          <span className="document__title">{i.name}</span>
        </div>
      ))}

      {/*TODO: create slider modal*/}

      {/*{showSlider && (*/}
      {/*  <SliderPopup*/}
      {/*    data={data}*/}
      {/*    activeSlide={activeSlide}*/}
      {/*    onClose={() => setShowSlider(false)}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  )
}
