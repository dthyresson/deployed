import { Badge, Box, Stack, Image, Text } from '@chakra-ui/core'
import moment from 'moment'

const User = ({ user }) => {
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"
      width={[
        '100%', // base
        '100%', // 480px upwards
        '60%', // 575px upwards
        '40%', // 768px upwards
        '40%', // 992px upwards
      ]}
      overflow="hidden"
    >
      <Image
        src={user.picture}
        alt={user.nickname}
        w="100%"
        maxH="30vh"
        objectFit="cover"
        align="top"
      />
      <Box p={4}>
        <Stack isInline>
          <Text>Nickname:</Text>
          <Text color="gray.300">{user.nickname}</Text>
        </Stack>
        <Stack isInline>
          <Text>Name:</Text>
          <Text color="gray.300">{user.name}</Text>
        </Stack>
        <Stack isInline>
          <Text>Email:</Text>
          <Text color="gray.300">{user.email}</Text>
        </Stack>
        <Stack isInline>
          <Text>Logins:</Text>
          <Text color="gray.300">{user.loginsCount}</Text>
        </Stack>
        <Stack isInline>
          <Text>Created:</Text>
          <Text color="gray.300">
            {moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </Stack>
        <Stack isInline>
          <Text>Last Login:</Text>
          <Text color="gray.300">
            {moment(user.lastLogin).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </Stack>
      </Box>
      <Stack m={4} isInline>
        {user.emailVerified && (
          <Badge variantColor="green">Email Verified</Badge>
        )}
        {!user.emailVerified && (
          <Badge variantColor="red">Email Not Verified</Badge>
        )}
      </Stack>
    </Box>
  )
}

export default User
