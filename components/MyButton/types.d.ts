export interface IMyButton {
  /**
   * Background is the color of the background of the button
   */
  backgroundColor?: string
  size?: 'small' | 'medium' | 'large'
  label: string
  onClick?: () => void
  variant: 'outlined' | 'contained' | 'text'
}
