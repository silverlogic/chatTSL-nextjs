import { Typography } from '@mui/material'
import { TypeAnimation } from 'react-type-animation'

const AssistantMessage = ({ response, animated }: { response: string; animated: boolean }) => {
  return (
    <Typography variant="body1" sx={{ marginTop: '12px' }}>
      {animated ? (
        <TypeAnimation sequence={[response]} speed={99} repeat={0} cursor={false} />
      ) : (
        response
      )}
    </Typography>
  )
}

export default AssistantMessage
