import { Badge, Box, Stack, Image, Text } from '@chakra-ui/core'
import moment from 'moment'
const ConnectedAccountBadges = ({ user }) => {
  return Object.keys(user.connected_accounts).map((account, index) => (
    <Badge key={`${account}-${index}`}>{account}</Badge>
  ))
}

const NetlifyUser = ({ user }) => {
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"
      w="40%"
      overflow="hidden"
    >
      <Image
        src={user.avatar_url}
        alt={user.full_name}
        w="100%"
        maxH="30vh"
        objectFit="cover"
        align="top"
      />
      <Box p={4}>
        <Stack isInline align="center">
          <Text>Name:</Text>
          <Text fontWeight="bold">{user.full_name}</Text>
        </Stack>
        <Stack isInline>
          <Text>Email:</Text>
          <Text fontWeight="bold">{user.email}</Text>
        </Stack>
        <Stack isInline>
          <Text>Sites:</Text>
          <Text fontWeight="bold">{user.site_count}</Text>
        </Stack>
        <Stack isInline>
          <Text>Created:</Text>
          <Text fontWeight="bold">
            {moment(user.created_at).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </Stack>
        <Stack isInline>
          <Text>Last Login:</Text>
          <Text fontWeight="bold">
            {moment(user.last_login).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </Stack>
      </Box>
      <Stack m={4} isInline>
        {!user.has_pending_email_verification && (
          <Badge variantColor="green">Email Verified</Badge>
        )}
        {user.has_pending_email_verification && (
          <Badge variantColor="red">Email Not Verified</Badge>
        )}
        {user.mfa_enabled && <Badge variantColor="green">MFA Enabled</Badge>}
        {!user.mfa_enabled && <Badge variantColor="red">MFA Not Enabled</Badge>}
        <ConnectedAccountBadges user={user} />
      </Stack>
    </Box>
  )
}

export default NetlifyUser
