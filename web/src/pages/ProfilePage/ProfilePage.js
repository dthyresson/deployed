import { useAuth } from '@redwoodjs/auth'
import { Box, Heading, Text } from '@chakra-ui/core'
import AppLayout from 'src/layouts/AppLayout'
import UserCell from 'src/components/UserCell'

const ProfilePage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  return (
    <AppLayout>
      <Heading mb={8}>Profile</Heading>

      <Box>
        {isAuthenticated && currentUser && <UserCell id={currentUser.id} />}
      </Box>
    </AppLayout>
  )
}

export default ProfilePage
