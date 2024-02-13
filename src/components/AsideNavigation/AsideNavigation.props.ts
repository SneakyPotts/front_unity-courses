export interface AsideNavigationProps {}
export interface NavAccordionProps {
  id: number
  imgId: string
  name: string
  link: string
  list?: {
    name: string
    link: string
  }[]
}
