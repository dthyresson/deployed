import AppLayout from 'src/layouts/AppLayout'
import { useAuth } from '@redwoodjs/auth'
import { Box, Heading, Text } from '@chakra-ui/core'
import NetlifyUser from 'src/components/NetlifyUser'

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  return (
    <AppLayout>
      <Heading mb={8}>Netlify OAuth Test</Heading>
      {!isAuthenticated && (
        <Text>You need Log In to see your Netlify profile</Text>
      )}
      <Box>
        {isAuthenticated && currentUser && <NetlifyUser user={currentUser} />}
      </Box>
    </AppLayout>
  )
}

export default HomePage
