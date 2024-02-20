export interface AccordionProps {
  order?: string | number
  title: string
  children: React.ReactNode
  onActive?: (value: boolean) => void
}
