import classNames from 'classnames'
import React from 'react'

import Image from 'next/image'

import { DetailPopup } from '@components/DetailPopup'

import { Loader } from '_ui/Loader'
import { RequestError } from '_ui/RequestError'

import type { ArchivedStatisticsProps } from './ArchivedStatistics.props'

export function ArchivedStatistics({ data, isLoading, isError }: ArchivedStatisticsProps) {
  return (
    <div className="marks-table">
      <div className="marks-table__inner">
        <div className="marks-table__bottom">
          <div className={classNames('marks-table__table table', '--short')}>
            <div className="table__wrapper">
              <div className="table__head">
                <div className="table__row">
                  <div className="table__th table__th--subjects">Курси</div>
                  <div className="table__th table__th--marks"></div>
                  <div className="table__th table__th--semester">Фінальна оцінка</div>
                </div>
              </div>
              <div className="table__body">
                {isLoading && <Loader />}
                {isError && <RequestError />}
                {!isLoading &&
                  !isError &&
                  data?.map((i) => (
                    <div
                      key={i.id}
                      className="table__row"
                    >
                      <div className="table__subject student-name">
                        <Image
                          src={i.cover || '/img/static/default-avatar.png'}
                          width={30}
                          height={30}
                          style={{ objectFit: 'cover' }}
                          alt={i.title}
                        />
                        <p>{i.title}</p>
                      </div>

                      <ul className="table__marks"></ul>

                      <DetailPopup
                        type="string"
                        title="Фінальна оцінка за курс"
                      >
                        <div className={classNames('table__total', { 'table__total--forecast': false })}>{i.final_mark || 0}</div>
                      </DetailPopup>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
