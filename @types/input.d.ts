import { DatePickerProps, TimePickerProps } from '@mui/lab'
import { SxProps } from '@mui/system'
import { ReactElement, ChangeEvent, MouseEvent } from 'react'

export interface MyInputProps {
  label?: string,
  value?: any,
  onChange?: (v) => void,
  error?: boolean,
  required?: boolean,
  hideHelperText?: boolean,
  helperText?: string,
  readOnly?: boolean,
  notClearable?: boolean,
  sx?: SxProps,
  disabled?: boolean
}

export type MyInputEvent = ChangeEvent<HTMLInputElement>
export type MyMouseEvent = MouseEvent<HTMLInputElement>

export interface MyAutocompleteProps extends MyInputProps {
  variant?: 'standard' | 'outlined' | 'filled',
  options?: any[],
  freeSolo?: boolean,
  multiple?: boolean,
  items: any[],
  freeSoloItemRender?: any,
  onChange?: (v, others) => void,
  inputComponent?: any,
  getOptionLabel?: (option: any) => string,
  isOptionEqualToValue?: (option: any, value: any) => boolean
}

export interface MyTextFieldProps extends MyInputProps {
  variant?: 'standard' | 'outlined' | 'filled',
  type?: 'number' | 'password' | 'text',
  startIcon?: ReactElement,
  actions?: ReactElement,
  multiline?: boolean,
  inputComponent?: any
}

export interface MyDatePickerProps extends MyInputProps {
  variant?: 'standard' | 'outlined' | 'filled',
  type?: 'date' | 'time' | 'datetime' | 'month'
}

export interface MySelectProps extends MyInputProps {
  variant?: 'standard' | 'outlined' | 'filled',
  items: any[],
  notMust?: boolean
}

export interface MyTabsProps extends MyInputProps {
  textKey?: string,
  items: any[],
  vertical?: boolean
}

export interface MyCheckBoxProps extends MyInputProps {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
}

export interface MyFormItem {
  key: string,
  label: string,
  rules?: Function[],
  type: 'text' | 'textArea' | 'number' | 'password' | 'date' | 'select' | 'custom',
  grid?: {
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
  } | number,
  component?: ReactElement,
  items?: any[],
  default?: any,
  otherProps?: any,
  hidden?: (v) => boolean
}
export interface MyFormProps {
  items: MyFormItem[], 
  onChange?: (v) => void, 
  onValid?: (v) => void,
  showError?: boolean,
  columnSpacing?: number,
  sx?: SxProps,
  updateHelper?: any,
  parseNewValue?: (oldV, newV) => any
}

export interface MyFilePickerProps {
  sizeLimit?: number,
  onChange?: (v) => void,
  multiple?: boolean,
  accept?: string,
  children?: ReactElement
}

export interface MyToggleItem {
  text?: string | ReactElement,
  value: string | number
}

export interface MyToggleProps {
  multiple?: boolean,
  value: string | number,
  onChange?: (v) => void,
  items: MyToggleItem[],
  spacing?: number,
  minWidth?: number | string,
  required?: boolean
}