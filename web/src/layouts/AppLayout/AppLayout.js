import UserAuthTools from 'src/components/UserAuthTools'
import { Box } from '@chakra-ui/core'

const AppLayout = ({ children }) => {
  return (
    <Box p={8}>
      <Box mb={8}>
        <UserAuthTools></UserAuthTools>
      </Box>
      {children}
    </Box>
  )
}

export default AppLayout
