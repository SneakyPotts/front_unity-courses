import React from 'react'

export function Banner({ isVertical = true }: { isVertical?: boolean }) {
  const min = 1
  const max = 3
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

  return (
    <div className="banner">
      {isVertical ? (
        <div className="banner__image-wrapper banner__image-wrapper--vertical">
          <img
            src={`/img/static/banner_${randomNumber}.png`}
            width={194}
            height={350}
            alt="banner for test"
          />
        </div>
      ) : (
        <div className="banner__inner">
          <h2 className="banner__title text-center">
            Збільши свій заробіток — почни <br /> вести курс з поглибленої математики
          </h2>
        </div>
      )}
    </div>
  )
}
