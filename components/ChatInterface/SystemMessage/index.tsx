import { Typography } from '@mui/material'

const SystemMessage = ({ response }: { response: string }) => {
  return (
    <Typography variant="body2" sx={{ marginTop: '12px' }}>
      {response}
    </Typography>
  )
}

export default SystemMessage
