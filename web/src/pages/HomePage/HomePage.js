import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import AppLayout from 'src/layouts/AppLayout'
import { Heading, Text } from '@chakra-ui/core'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <AppLayout>
      <Heading mb={8}>Deployed</Heading>
      {!isAuthenticated && <Text>You need Log In to see your profile</Text>}
      <Link to="profile">{routes.profile()}</Link>
    </AppLayout>
  )
}

export default HomePage
