import React from 'react'

import s from './TemplateName.module.scss'
import type { TemplateNameProps } from './TemplateName.props'

export function TemplateName({}: TemplateNameProps) {
  return (
    <div className={s.templateName}>
      <div>TemplateName</div>
    </div>
  )
}
