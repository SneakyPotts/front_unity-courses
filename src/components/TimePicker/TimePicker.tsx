import { format, set } from 'date-fns'
import React, { useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import SimpleBar from 'simplebar-react'
import { useOnClickOutside } from 'usehooks-ts'

import type { TimePickerProps } from './TimePicker.props'

const HH = [...Array.from({ length: 23 }, (_, i) => (i < 9 ? `0${i + 1}` : `${i + 1}`)), '00']
const mm = [...Array.from({ length: 59 }, (_, i) => (i < 9 ? `0${i + 1}` : `${i + 1}`)), '00']

export function TimePicker({ initValue, onTimeChange }: TimePickerProps) {
  const wrapper = useRef<HTMLLabelElement>(null)

  const [show, setShow] = useState(false)

  const [time, setTime] = useState(initValue)

  const [referenceElement, setReferenceElement] = useState<any>(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
  })

  const setTimePart = (value: string, type: 'h' | 'm') => {
    setTime((prev) => {
      const newTime = type === 'h' ? set(prev, { hours: Number(value) }) : set(prev, { minutes: Number(value) })

      onTimeChange(newTime)

      return newTime
    })
  }

  useOnClickOutside(wrapper, () => setShow(false))

  return (
    <label
      ref={wrapper}
      className="time"
      onClick={(e) => e.preventDefault()}
    >
      <input
        ref={setReferenceElement}
        type="text"
        className="time__input"
        value={format(time, 'HH:mm')}
        onClick={() => setShow((p) => !p)}
        readOnly
      />
      {show && (
        <div
          ref={setPopperElement}
          {...attributes.popper}
          style={styles.popper}
          className="time__picker"
        >
          <SimpleBar className="time__picker-inner">
            <ul className="time__picker-time">
              {HH.map((h) => (
                <li
                  key={`qwe${h}`}
                  onClick={() => setTimePart(h, 'h')}
                >
                  {h}
                </li>
              ))}
            </ul>
          </SimpleBar>
          <SimpleBar className="time__picker-inner">
            <ul className="time__picker-time">
              {mm.map((m, i) => (
                <li
                  key={`asd${m}${i}`}
                  onClick={() => setTimePart(m, 'm')}
                >
                  {m}
                </li>
              ))}
            </ul>
          </SimpleBar>
        </div>
      )}
    </label>
  )
}
