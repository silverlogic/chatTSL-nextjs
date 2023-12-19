import { getErrorTextMessage } from '@baseapp-frontend/core'
import { useSnackbar, VariantType } from 'notistack'

export default function useNotifications() {
  const { enqueueSnackbar } = useSnackbar()

  const showError = (error: any) => {
    const message = getErrorTextMessage(error)
    showMessage(message, 'error')
  }

  const showMessage = (message: string, variant: VariantType = 'info') => {
    enqueueSnackbar(message, { anchorOrigin: { horizontal: 'right', vertical: 'top' }, variant })
  }

  const showSuccess = (message: string) => {
    showMessage(message, 'success')
  }

  return {
    showError,
    showSuccess,
    showMessage,
  }
}
