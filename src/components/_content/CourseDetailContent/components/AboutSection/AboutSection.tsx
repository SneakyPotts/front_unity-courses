import React from 'react'

import type { AboutSectionProps } from './AboutSection.props'

export function AboutSection({ title, description }: AboutSectionProps) {
  return (
    <>
      <h3
        id="about"
        className={'archive__about-title'}
      >
        {title}
      </h3>
      <div className={'archive__about-info'}>
        <p className={'archive__subtitle'}>Про курс</p>
        <div
          className={'archive__about-text'}
          dangerouslySetInnerHTML={{ __html: description || '' }}
        />
      </div>
    </>
  )
}
