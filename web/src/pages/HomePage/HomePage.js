import AppLayout from 'src/layouts/AppLayout'
import { useAuth } from '@redwoodjs/auth'
import { Box, Heading, Text } from '@chakra-ui/core'
import UserCell from 'src/components/UserCell'

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  return (
    <AppLayout>
      <Heading mb={8}>Deployed</Heading>
      {!isAuthenticated && <Text>You need Log In to see your profile</Text>}
      <Box>
        {isAuthenticated && currentUser && <UserCell id={currentUser.id} />}
      </Box>
    </AppLayout>
  )
}

export default HomePage
