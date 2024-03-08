import classNames from 'classnames'
import React, { useState } from 'react'

import { Button } from '_ui/Button'
import { toastPromise } from '_ui/ToastUtils'

import type { ExternalLinkEditorProps } from './ExternalLinkEditor.props'

export function ExternalLinkEditor({ title, label, buttonContent, initialLink, handler }: ExternalLinkEditorProps) {
  const [externalLink, setExternalLink] = useState(initialLink)
  const [isEdit, setIsEdit] = useState(!initialLink?.length)

  const handleSave = () => {
    if (!!externalLink?.length) {
      toastPromise({
        handler: handler(externalLink),
        successCallback: () => setIsEdit(false),
        successMessage: 'Посилання успішно збережено',
      })
    }
  }

  return (
    <div className="lesson-section__section">
      <div className="lesson-section__text">
        <h2>{title}</h2>
      </div>

      <div className="lesson-section__case">
        <div className="lesson-section__lable">
          <p>{label}</p>
          <div className={classNames('lesson-section__extra-link--wrapper', { '--is-edit': isEdit })}>
            <label className="lesson-section__extra-link--label">
              <svg>
                <use href="/img/sprite.svg#link"></use>
              </svg>
              <input
                type="text"
                className={'lesson-section__extra-link--input'}
                value={externalLink}
                onChange={({ target: { value } }) => setExternalLink(value)}
                readOnly={!isEdit}
              />
              {!isEdit && (
                <button
                  className="lesson-section__extra-link--edit"
                  onClick={() => setIsEdit(true)}
                >
                  <svg>
                    <use href="/img/sprite.svg#pensil"></use>
                  </svg>
                </button>
              )}
            </label>
            {isEdit && (
              <button
                className="lesson-section__extra-link--save"
                onClick={handleSave}
              >
                <svg>
                  <use href="/img/sprite.svg#check-mark"></use>
                </svg>
              </button>
            )}
          </div>
        </div>

        <Button
          className={'lesson-section__extra-link--button'}
          disabled={!externalLink?.length || isEdit}
          href={externalLink}
          target="_blank"
        >
          {buttonContent}
        </Button>
      </div>
    </div>
  )
}
