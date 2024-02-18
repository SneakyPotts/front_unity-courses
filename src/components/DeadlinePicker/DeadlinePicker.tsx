import classNames from 'classnames'
import { addDays, getDate, isSameDay } from 'date-fns'
import { uk } from 'date-fns/locale'
import React, { useRef, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import type ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useWindowSize } from 'usehooks-ts'

import { TimePicker } from '@components/TimePicker'

import { Button } from '_ui/Button'
import { Field } from '_ui/Field'

import type { DeadlinePickerProps } from './DeadlinePicker.props'
import './DeadlinePicker.scss'

// import { toastPromise } from '_ui/ToastUtils'

registerLocale('uk', uk)

const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']

export function DeadlinePicker({ deadline, handler, onSave, onClear, customInput }: DeadlinePickerProps) {
  const calendarRef = useRef<ReactDatePicker>(null)

  const [startDate, setStartDate] = useState(deadline ? new Date(deadline) : new Date())
  const [isShowTimeInput, setIsShowTimeInput] = useState(false)

  const handleSend = () => {
    // handler &&
    //   toastPromise({
    //     handler: handler(formatISO(new Date(startDate))),
    //     successCallback: () => calendarRef.current?.setOpen(false),
    //     successMessage: 'Дата і час дедлайну успішно збережені',
    //   })
    onSave && onSave(startDate)

    calendarRef?.current?.setOpen(false)
  }

  const handleClear = () => {
    onClear ? onClear() : setStartDate(deadline ? new Date(deadline) : new Date())

    calendarRef?.current?.setOpen(false)
  }

  return (
    <DatePicker
      ref={calendarRef}
      portalId="deadline"
      wrapperClassName={classNames('deadline__wrapper', { '--custom': !!customInput })}
      calendarClassName={'deadline__calendar'}
      popperClassName={'deadline__popper'}
      showPopperArrow={false}
      popperPlacement={'bottom-end'}
      popperModifiers={[
        {
          name: 'offset',
          fn(state) {
            // Do something with the state
            console.log(state)
            state.x += 25
            return state
          },
        },
      ]}
      dayClassName={() => 'deadline__day'}
      weekDayClassName={() => 'deadline__weekDay'}
      placeholderText="Оберіть дату"
      timeInputLabel="Час:"
      locale="uk"
      dateFormat={isShowTimeInput ? 'dd.MM.yyyy HH:mm' : 'dd.MM.yyyy'}
      showTimeInput={isShowTimeInput}
      customTimeInput={
        <TimePicker
          initValue={startDate}
          onTimeChange={setStartDate}
        />
      }
      shouldCloseOnSelect={false}
      selected={startDate}
      openToDate={startDate}
      onChange={(date, _) => {
        setStartDate(date!)
      }}
      renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
        <>
          <div className="create__top">
            <div className="create__types">
              <button
                className={classNames(`create__type`, { 'create__type--active': isSameDay(date, new Date()) })}
                onClick={() => setStartDate(new Date())}
              >
                <div className="create__icon">
                  <svg className="create__icon-svg">
                    <use href="/img/sprite.svg#calendar-wrapper"></use>
                  </svg>
                  <span className="create__icon-num">{getDate(new Date())}</span>
                </div>
                Сьогодні
              </button>
              <button
                className={classNames(`create__type`, { 'create__type--active': isSameDay(date, addDays(new Date(), 1)) })}
                onClick={() => setStartDate(addDays(new Date(), 1))}
              >
                <div className="create__icon">
                  <svg className="create__icon-svg">
                    <use href="/img/sprite.svg#calendar-wrapper"></use>
                  </svg>
                  <span className="create__icon-num">+1</span>
                </div>
                Завтра
              </button>
              {onClear && (
                <button
                  className="create__type"
                  onClick={handleClear}
                >
                  <div className="create__icon">
                    <svg className="create__icon-svg">
                      <use href="/img/sprite.svg#close"></use>
                    </svg>
                  </div>
                  Без дати
                </button>
              )}
            </div>
          </div>
          <div className="month-navigate">
            <span className="current-value">
              <span className={'current-value__month'}>{months[date.getMonth()]}</span> <span className={'current-value__year'}>{date.getFullYear()}</span>
            </span>
            <div className="month-navigate__buttons">
              <button
                className="month-navigate__button"
                onClick={decreaseMonth}
              >
                <svg className="month-navigate__button-icon">
                  <use href="/img/sprite.svg#arrow-right"></use>
                </svg>
              </button>
              <button
                className="month-navigate__button"
                onClick={increaseMonth}
              >
                <svg className="month-navigate__button-icon">
                  <use href="/img/sprite.svg#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
      customInput={
        customInput ?? (
          <Field
            type={'text'}
            className={'deadline-picker'}
          />
        )
      }
    >
      <>
        {!isShowTimeInput && (
          <button
            type="button"
            className="deadline__time-toggler"
            onClick={() => setIsShowTimeInput(true)}
          >
            Додати час
          </button>
        )}
        <div className="deadline__controls">
          <Button
            className="create__button"
            variant={'border'}
            onClick={handleClear}
          >
            Скасувати
          </Button>
          <Button
            className="create__button"
            onClick={handleSend}
          >
            <svg className="btn__icon">
              <use href="/img/sprite.svg#webcam"></use>
            </svg>
            Зберегти
          </Button>
        </div>
      </>
    </DatePicker>
  )
}
// react-datepicker__day deadline__day react-datepicker__day--027 react-datepicker__day--keyboard-selected
// react-datepicker__day deadline__day react-datepicker__day--011 react-datepicker__day--selected react-datepicker__day--weekend
