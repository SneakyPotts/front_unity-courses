import localFont from 'next/font/local'

const SFUITextFont = localFont({
  src: [
    {
      path: './/SFUIText-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './SFUIText-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './SFUIText-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

export default SFUITextFont
