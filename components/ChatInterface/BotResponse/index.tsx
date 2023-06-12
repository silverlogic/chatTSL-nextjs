import { Typography } from '@mui/material'
import { TypeAnimation } from 'react-type-animation'

const BotResponse = ({ response }: { response: string }) => {
  return (
    <Typography variant="body1" sx={{ marginTop: '12px' }}>
      <TypeAnimation sequence={[response]} speed={99} repeat={0} cursor={false} />
    </Typography>
  )
}

export default BotResponse
