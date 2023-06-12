import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import { LoadingDot } from '../styled'

const LoadingDots = () => {
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ display: 'inline-block' }}
      >
        <LoadingDot />
        <LoadingDot />
        <LoadingDot />
      </motion.div>
    </Box>
  )
}

export default LoadingDots
