import React from 'react'

import { Banner } from '_ui/Banner'

export default function AsideRight() {
  return (
    <div className={'my-catalog__banner'}>
      <div className={'my-catalog__banner-box'}>
        <Banner />
      </div>
      <div className={'my-catalog__banner-box'}>
        <Banner />
      </div>
      <div className={'my-catalog__banner-box'}>
        <Banner />
      </div>
    </div>
  )
}
