import type { Meta, StoryObj } from '@storybook/react'
import { MyTypography } from '.'

const meta: Meta<typeof MyTypography> = {
  title: 'Typrography',
  component: MyTypography,
}

export default meta
type Story = StoryObj<typeof MyTypography>

export const MyFirstTypography: Story = {
  args: {
    label: 'My text',
  },
}
