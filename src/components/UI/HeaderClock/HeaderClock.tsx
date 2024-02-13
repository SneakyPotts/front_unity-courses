import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'

import type { HeaderClockProps } from './HeaderClock.props'

export function HeaderClock({}: HeaderClockProps) {
  const [time, setTime] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    setTime({
      hours: format(new Date(), 'HH'),
      minutes: format(new Date(), 'mm'),
      seconds: format(new Date(), 'ss'),
    })
    const timerID = setInterval(() => {
      setTime({
        hours: format(new Date(), 'HH'),
        minutes: format(new Date(), 'mm'),
        seconds: format(new Date(), 'SS'),
      })
    }, 1000)
    return () => clearInterval(timerID)
  }, [])

  if (time)
    return (
      <div className="header__time">
        <span className="header__hours">{time.hours}</span>
        <span className="header__minutes">{time.minutes}</span>
        <span className="header__seconds">{time.seconds}</span>
      </div>
    )
}
