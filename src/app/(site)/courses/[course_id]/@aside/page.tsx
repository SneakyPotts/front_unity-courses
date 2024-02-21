import React from 'react'

import { Banner } from '_ui/Banner'

export default function AsideRight() {
  return (
    <div className={'archive__banner'}>
      <div className={'archive__banner-box'}>
        <Banner />
      </div>
      <div className={'archive__banner-box'}>
        <Banner />
      </div>
      <div className={'archive__banner-box'}>
        <Banner />
      </div>
    </div>
  )
}
