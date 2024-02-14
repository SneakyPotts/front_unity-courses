export const navListParents = [
  {
    id: 1,
    name: 'Головна',
    imgId: 'group',
    link: '/',
    list: [],
  },
  {
    id: 2,
    imgId: 'wallet',
    name: 'Гаманець',
    link: '/wallet',
    list: [],
  },
  {
    id: 3,
    imgId: 'childrens',
    name: 'Діти',
    link: '/children',
    list: [],
  },
  {
    id: 4,
    imgId: 'calendar',
    name: 'Розклад',
    link: '/schedule',
    list: [],
  },
  {
    id: 5,
    imgId: 'chat',
    name: 'Чати',
    link: '/chat',
    list: [],
  },
  {
    id: 6,
    imgId: 'statistics',
    name: 'Статистика',
    link: '/statistics',
    list: [],
  },
  // {
  //   id: 7,
  //   imgId: 'cours',
  //   name: 'Курси',
  //   link: '/courses',
  //   list: [],
  // },
]

export const navListChildren = [
  {
    id: 1,
    name: 'Головна',
    imgId: 'group',
    link: '/',
    list: [],
  },
  {
    id: 2,
    name: 'Каталог курсів',
    imgId: 'cours',
    link: '/schedule',
    list: [],
  },
  {
    id: 3,
    imgId: 'list',
    name: 'Мої курси',
    link: '/any',
    list: [],
  },
  {
    id: 4,
    imgId: 'calendar',
    name: 'Розклад',
    link: '/statistics',
    list: [],
  },
  {
    id: 5,
    imgId: 'chat',
    name: 'Чати',
    link: '/statistics',
    list: [],
  },
  {
    id: 6,
    imgId: 'statistics',
    name: 'Статистика',
    link: '/statistics',
    list: [],
  },
]

export const navListTeacher = [
  {
    id: 1,
    name: 'Головна',
    imgId: 'group',
    link: '/',
    list: [],
  },
  {
    id: 3,
    imgId: 'calendar',
    name: 'Розклад',
    link: '/schedule',
    list: [],
  },
  // {
  //   id: 4,
  //   imgId: 'pen',
  //   name: 'Перевірка знань',
  //   link: '/teacher/test-knowledge',
  //   list: [],
  // },
  {
    id: 5,
    imgId: 'childrens',
    name: 'Мій клас',
    link: '/teacher/my-class',
    list: [],
  },
  {
    id: 6,
    imgId: 'chat',
    name: 'Чати',
    link: '/any',
    list: [],
  },
  {
    id: 7,
    imgId: 'statistics',
    name: 'Звіт',
    link: '/any',
    list: [],
  },
]

export const navListMatch = {
  2: navListChildren,
  10: navListParents,
  20: navListTeacher,
}

export const extraClass: {
  '/': string
  '/wallet': string
  '/children': string
  [key: string]: string
} = {
  '/': 'nav__item--home',
  '/wallet': 'nav__item--wallet',
  '/children': 'nav__item--childrens',
}
