export interface DropdownProps {
  valuesList?: string[] | number[]
  initValue?: string
  value?: string | number
  onChange?: (val: string | number) => void
}
