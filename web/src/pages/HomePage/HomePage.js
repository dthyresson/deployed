import AppLayout from 'src/layouts/AppLayout'
import { useAuth } from '@redwoodjs/auth'
import { Box, Heading, Text } from '@chakra-ui/core'
import User from 'src/components/User'

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  return (
    <AppLayout>
      <Heading mb={8}>Deployed</Heading>
      {!isAuthenticated && <Text>You need Log In to see your profile</Text>}
      <Box>{isAuthenticated && currentUser && <User user={currentUser} />}</Box>
    </AppLayout>
  )
}

export default HomePage
