import classNames from 'classnames'
import React, { useEffect } from 'react'

import type { TabsProps } from './Tabs.props'

export function Tabs({ list, activeTab, setActiveTab, className, isStatic, isSmall, isBig, element }: TabsProps) {
  useEffect(() => {
    const resetActiveTab = () => setActiveTab(1)

    window.addEventListener('resize', resetActiveTab)

    return () => {
      window.removeEventListener('resize', resetActiveTab)
    }
  }, [])

  return (
    <div className={classNames('content-tabs', className, { 'content-tabs--static': isStatic, 'content-tabs--small': isSmall, 'content-tabs--big': isBig })}>
      <div className="content-tabs__wrapper">
        <ul className="content-tabs__list">
          {list.map((i, index) => (
            <li
              key={i}
              className="content-tabs__item"
            >
              <button
                className={classNames('content-tabs__btn', { 'content-tabs__btn--active': activeTab === index + 1 })}
                onClick={() => setActiveTab(index + 1)}
              >
                {i}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {element}
    </div>
  )
}
