'use client'

import { MathJax } from 'better-react-mathjax'
import classNames from 'classnames'
import { format } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { dynamicOptions } from '@assets/constants'
import { imgBlur } from '@assets/utils'
import { Portal } from '@components/Portal'
import { UploadDocumentItem } from '@components/UploadDocument'
import { useAnimate } from '@hooks/useAnimate'
import { useBlockScroll } from '@hooks/useBlockScroll'
import { revalidateSelfWork } from '@http/teacher/actions'
import { useQueryTeacherLesson } from '@http/teacher/client.lesson'
// @ts-ignore
import { Options, Splide, SplideSlide } from '@splidejs/react-splide'

import { Button } from '_ui/Button'
import { Dropdown } from '_ui/Dropdown'
import { toastPromise } from '_ui/ToastUtils'

import type { CheckSelfWorkContentProps, TeacherHomeWorkListProps, TeacherHomeWorkSliderProps } from './CheckSelfWorkContent.props'

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

  return (
    <div className={'lesson-section__block'}>
      {data.progress_type !== 2 && <div className={'lesson-section__deadline'}>{format(new Date(data.answer_timestamp), 'dd.MM.yyyy HH:mm')}</div>}

      {data?.progress_type === 2 ? (
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

function SliderPopup({ data, activeSlide, onClose }: TeacherHomeWorkSliderProps) {
  const mainRef = useRef<any>(null)
  const thumbsRef = useRef<any>(null)

  const [isAnimate, handleClose] = useAnimate(onClose)

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide)
    }
  }, [])

  useBlockScroll()

  const mainOptions: Options = {
    type: 'fade',
    rewind: true,
    perPage: 1,
    perMove: 1,
    pagination: false,
    arrows: true,
    height: '60vh',
    width: '80vw',
    drag: false,
    start: activeSlide,
  }

  const thumbsOptions: Options = {
    type: 'slide',
    rewind: true,
    gap: '20px',
    pagination: false,
    fixedWidth: 160,
    fixedHeight: 93,
    cover: true,
    isNavigation: true,
    direction: 'ltr',
    height: '93px',
    arrows: false,
    start: activeSlide,
  }

  return (
    <Portal>
      <div className={classNames('slider-popup', { 'slider-popup--hide': isAnimate })}>
        <div
          className="slider-popup__close"
          onClick={handleClose}
        >
          <svg>
            <use href="/img/sprite.svg#cross"></use>
          </svg>
        </div>

        <div>
          <Splide
            options={mainOptions}
            ref={mainRef}
          >
            {data.map((slide) => (
              <SplideSlide
                key={slide.id}
                style={{ position: 'relative' }}
              >
                <Image
                  src={slide.file}
                  fill
                  {...imgBlur}
                  alt={slide.name}
                />
              </SplideSlide>
            ))}
          </Splide>

          <Splide
            options={thumbsOptions}
            ref={thumbsRef}
            className="slider-popup__thumbs"
          >
            {data.map((slide) => (
              <SplideSlide
                key={slide.id}
                className="slider-popup__thumb-slide"
                style={{ position: 'relative' }}
              >
                <Image
                  src={slide.file}
                  fill
                  {...imgBlur}
                  alt={slide.name}
                />
                <span className="slider-popup__thumb-overlay" />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </Portal>
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

      {showSlider && (
        <SliderPopup
          data={data}
          activeSlide={activeSlide}
          onClose={() => setShowSlider(false)}
        />
      )}
    </div>
  )
}
