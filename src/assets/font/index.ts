import localFont from 'next/font/local'

const RobotoFont = localFont({
  src: [
    {
      path: './Roboto/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Roboto/Roboto-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Roboto/Roboto-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

export default RobotoFont
