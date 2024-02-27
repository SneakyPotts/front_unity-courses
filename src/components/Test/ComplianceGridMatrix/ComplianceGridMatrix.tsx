import classNames from 'classnames'
import React, { Fragment } from 'react'

import { alphabet } from '@assets/constants'

import type { ComplianceGridMatrixProps } from './ComplianceGridMatrix.props'

export function ComplianceGridMatrix({ rows, cells, answerCheckHandler, valueGetter, checkedGetter, inputHandler }: ComplianceGridMatrixProps) {
  const iconGetter = (i: number, j: number) => {
    if (!answerCheckHandler) return 'checkbox-clos-active'

    const result = answerCheckHandler(i, j)

    if (result.studentAnswer && result.rightAnswer) return 'test-right'
    if (result.studentAnswer && !result.rightAnswer) return 'test-wrong'
    if (!result.studentAnswer && result.rightAnswer) return 'test-pale'

    return ''
  }

  return (
    <div
      className="answer-block matrix-grid"
      // style={checkedGetter ? { pointerEvents: 'none' } : {}}
    >
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <div
          key={`row-item${i}`}
          className="row-item"
        >
          {Array.from({ length: cells }).map((_, j) => (
            <Fragment key={`cell-item${j}`}>
              {!i && !j && <div className="cell-item" />} {/* empty item on position [0,0] */}
              {!j && !!i && <div className="cell-item">{i}</div>} {/* row index - number */}
              <div className="cell-item">
                {!i ? (
                  alphabet[j] // cell index - alphabet char
                ) : (
                  <label className="field__checkbox checkbox tests__item-lable">
                    <input
                      type="checkbox"
                      className="checkbox__input"
                      value={valueGetter ? valueGetter(i - 1, j) : ''}
                      defaultChecked={checkedGetter ? checkedGetter(i - 1, j) : false}
                      onChange={inputHandler}
                    />
                    <div className="checkbox__block">
                      <span className="checkbox__checkmark checkbox__checkmark--default">
                        <svg>
                          <use href="/img/sprite.svg#checkbox-default" />
                        </svg>
                      </span>
                      <span className={classNames('checkbox__checkmark checkbox__checkmark--active', !!answerCheckHandler && iconGetter(i - 1, j))}>
                        <svg>
                          <use href={`/img/sprite.svg#${iconGetter(i - 1, j)}`} />
                        </svg>
                      </span>
                    </div>
                  </label>
                )}
              </div>
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  )
}
