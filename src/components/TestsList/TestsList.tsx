import classNames from 'classnames'
import parse, { Element, type HTMLReactParserOptions } from 'html-react-parser'
import React, { type ChangeEventHandler, Fragment, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePopper } from 'react-popper'
import { useOnClickOutside } from 'usehooks-ts'

import Image from 'next/image'

import type { TTestResult } from '@assets/types/globals'
import { imgBlur } from '@assets/utils'
import { Portal } from '@components/Portal'
import { Single, TestWrapper, descMatcher } from '@components/Test'
import { ComplianceGridMatrix } from '@components/Test/ComplianceGridMatrix'
import { TextEditor } from '@components/TextEditor'
import { useQueryStudentLesson } from '@http/student/client.lesson'

import { Button } from '_ui/Button'
import { toastPromise } from '_ui/ToastUtils'

import type { ComplianceQuestionProps, FillInputProps, FillQuestionProps, FreeQuestionProps, SingleQuestionProps, TestsListProps } from './TestsList.props'

export function TestsList({ questions, test_id, setNotEditing, extraHandler }: TestsListProps) {
  const { sendTest: sendAnswers } = useQueryStudentLesson({})

  const { handleSubmit, setValue } = useForm<any>()

  const assemblyRequestBody = (data: any): TTestResult => {
    const instanceBody = Array.from({ length: questions.length }, (_, i) => ({ question_id: questions[i].id, answers: [] }))

    return instanceBody.map((item) => {
      for (const key in data) {
        if (key === item.question_id) return { ...item, answers: data[key] }
      }

      return item
    })
  }

  const onSubmit = (data: any) => {
    let body = assemblyRequestBody(data)

    toastPromise({
      handler: (extraHandler ?? sendAnswers)({ test_id, body }),
      successCallback: setNotEditing,
      successMessage: 'Ваші відповіді успішно надіслано на перевірку',
    })
  }

  return (
    <form
      className="tests"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="tests__inner">
        <h2 className="tests__title">Процеси життєдіяльності тварин</h2>
        {questions.map((v, i) => (
          <Fragment key={v.id}>
            {(v.answer_type === 1 || v.answer_type === 2) && (
              <SingleQuestion
                key={`${v.question}_${i}`}
                indexNumber={i + 1}
                {...v}
                setValue={setValue}
              />
            )}
            {(v.answer_type === 3 || v.answer_type === 4) && (
              <ComplianceQuestion
                key={`${v.question}_${i}`}
                indexNumber={i + 1}
                {...v}
                setValue={setValue}
              />
            )}
            {v.answer_type === 5 && (
              <FillQuestion
                key={`${v.question}_${i}`}
                indexNumber={i + 1}
                {...v}
                setValue={setValue}
              />
            )}
            {v.answer_type === 6 && (
              <FreeQuestion
                key={`${v.question}_${i}`}
                indexNumber={i + 1}
                {...v}
                setValue={setValue}
              />
            )}
          </Fragment>
        ))}
      </div>
      <Button
        type="submit"
        // disabled={sendIsLoading}
      >
        <svg className="btn__icon">
          <use href="/img/sprite.svg#check-mark" />
        </svg>
        зберегти
      </Button>
    </form>
  )
}

function SingleQuestion({ id, answer_type, answer_type_str, answers, question, indexNumber, setValue }: SingleQuestionProps) {
  const [answer, setAnswer] = useState<string[]>([])

  const handleChange = (answer_id: string) => {
    const currAnswers = answer_type === 1 ? [answer_id] : answer.includes(answer_id) ? answer.filter((v) => v !== answer_id) : [...answer, answer_id]

    setAnswer(currAnswers)

    setValue(id, currAnswers)
  }

  return (
    <Single
      variant="question"
      id={id}
      type={answer_type === 1 ? 'radio' : 'checkbox'}
      question={question}
      description={descMatcher[answer_type]}
      options={answers}
      indexNumber={indexNumber}
      handleChange={handleChange}
    />
  )
}

function ComplianceQuestion({ id, answer_type, answer_type_str, answers: { left_column, right_column }, question, indexNumber, setValue }: ComplianceQuestionProps) {
  const imgLeft = left_column.every((v) => !!v.image_answer)
  const imgRight = right_column.every((v) => !!v.image_answer)

  const [currentValue, setCurrentValue] = useState<string[]>([])

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value

    if (answer_type === 3) {
      const newValue = currentValue.includes(value) ? currentValue.filter((v) => v !== value) : [...currentValue, value]

      setCurrentValue(newValue)
      setValue(id, newValue)
    } else {
      const valueArr = value.split(',')

      const existing = currentValue.find((v) => v.split(',')[0] === valueArr[0])

      if (existing) {
        if (currentValue.includes(value)) {
          const newValue = currentValue.filter((v) => v !== value)

          setCurrentValue(newValue)
          setValue(id, newValue)
        } else {
          const existingArray = existing.split(',')
          const newElement = existingArray.includes(valueArr[1]) ? existingArray.filter((v) => v !== valueArr[1]) : [...existingArray, valueArr[1]]
          const index = currentValue.indexOf(existing)

          const newValue = [...currentValue.slice(0, index), newElement.join(','), ...currentValue.slice(index + 1)]

          setCurrentValue(newValue)
          setValue(id, newValue)
        }
      } else {
        const newValue = [...currentValue, value]

        setCurrentValue(newValue)
        setValue(id, newValue)
      }
    }
  }

  return (
    <TestWrapper
      indexNumber={indexNumber}
      question={question}
      description={descMatcher[`${answer_type === 3 ? (`${answer_type}${imgLeft || imgRight ? '_img' : ''}` as '3_img') : answer_type}`]}
    >
      <div className="tests__content">
        <ol className={classNames('tests__scroll', { 'tests__alternative--element': imgLeft })}>
          {left_column.map((v, i) => (
            <li
              key={`${v.text_answer}_${i}`}
              className="tests__scroll-text"
            >
              {imgLeft ? (
                <div className="tests__alternative-photo">
                  <Image
                    src={v.image_answer!}
                    fill
                    sizes="10vw"
                    {...imgBlur}
                    alt={question}
                  />
                </div>
              ) : (
                v.text_answer
              )}
            </li>
          ))}
        </ol>
        <ul className="tests__alternative">
          {right_column.map((v, i) => (
            <li
              key={`${v.text_answer}_${i}`}
              className="tests__alternative-text"
            >
              {imgRight ? (
                <div className="tests__alternative-photo">
                  <Image
                    src={v.image_answer!}
                    fill
                    sizes="10vw"
                    {...imgBlur}
                    alt={question}
                  />
                </div>
              ) : (
                v.text_answer
              )}
            </li>
          ))}
        </ul>
      </div>

      <ComplianceGridMatrix
        rows={left_column.length}
        cells={right_column.length}
        valueGetter={(i, j) => `${left_column[i].id},${right_column[j].id}`}
        inputHandler={handleOnChange}
      />
    </TestWrapper>
  )
}

function FillQuestion({ id, answer_type, answer_type_str, answers, question, indexNumber, setValue }: FillQuestionProps) {
  const [arrAnswers, setArrAnswers] = useState<string[]>(Array.from({ length: answers.length }, () => ''))

  const setFormValue = (index: number, value: string) => {
    const arrAnswersCopy = arrAnswers
    arrAnswersCopy.splice(index, 1, value)

    setArrAnswers(arrAnswersCopy)
    setValue(id, arrAnswersCopy)
  }

  const textWithInputs = useMemo(() => {
    const part = '___'
    let text = question
    let answerIndex = 0

    const inputStr = (id: number) => `<input class='replace' id='${id}' />`

    const replacer = (start: number = 0) => {
      const index = text.indexOf(part, start)

      if (index === -1) return

      text = text.slice(0, index) + inputStr(answerIndex) + text.slice(index + 3)

      const nextStart = index + inputStr(answerIndex).length

      if (text.length - (nextStart + 1) < 3) return

      answerIndex++
      replacer(nextStart)
    }

    replacer()

    const options: HTMLReactParserOptions = {
      replace: (domNode) => {
        if ((domNode as Element).attribs?.class === 'replace') {
          const id = (domNode as Element).attribs?.id

          return (
            <FillInput
              answer={answers[Number(id)]}
              handleChange={(value) => setFormValue(Number(id), value)}
            />
          )
        }
      },
    }

    return parse(text, options)
  }, [answers, question])

  return (
    <TestWrapper
      indexNumber={indexNumber}
      description={descMatcher[answer_type]}
    >
      <div className="tests__info">
        <div className="tests__info-text">{textWithInputs}</div>
      </div>
    </TestWrapper>
  )
}

function FillInput({ answer: { options, id }, handleChange }: FillInputProps) {
  const listOptions = useRef<HTMLDivElement | null>(null)

  const [isShowOptions, setIsShowOptions] = useState(false)
  const [value, setValue] = useState('')

  const [referenceElement, setReferenceElement] = useState<any>(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{ name: 'offset', options: { offset: [0, 1] } }],
  })

  const handleWrite: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange(e.target.value)
  }

  const handleOnChange = (value: string) => {
    setValue(value)

    handleChange(value)
  }

  useOnClickOutside(listOptions, () => setIsShowOptions(false))

  if (!options)
    return (
      <input
        className="tests__info-input"
        type="text"
        onChange={handleWrite}
      />
    )

  const maxContentWidth = () => {
    const longest = options.reduce((a, b) => (a.length > b.length ? a : b))

    return `${longest.length * 11 + 8}px`
  }

  return (
    <label
      ref={setReferenceElement}
      className="tests__fill-label"
      onClick={() => setIsShowOptions((p) => !p)}
    >
      <input
        className="tests__info-input"
        type="text"
        style={{ maxWidth: maxContentWidth() }}
        value={value}
        readOnly
      />
      {isShowOptions && (
        <Portal>
          <div
            ref={(ref) => {
              listOptions.current = ref
              setPopperElement(ref)
            }}
            className="tests__fill-list"
            style={styles.popper}
            {...attributes.popper}
          >
            <div className="tests__fill-scroll">
              {options.map((v) => (
                <span
                  key={v}
                  className="tests__fill-item"
                  onClick={() => handleOnChange(v)}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </Portal>
      )}
    </label>
  )
}

function FreeQuestion({ id, answer_type, answer_type_str, question, indexNumber, setValue }: FreeQuestionProps) {
  const [text, setText] = useState('')

  const handleChange = (value: string) => {
    setText(value)
    setValue(id, [value])
  }

  return (
    <TestWrapper
      indexNumber={indexNumber}
      description={descMatcher[answer_type]}
      question={question}
    >
      <TextEditor
        version={4}
        initData={text}
        onChange={handleChange}
      />
    </TestWrapper>
  )
}
