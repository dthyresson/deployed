import {
  fetchUserProfileByUserId,
  UserWithProfile,
} from 'src/services/userProfiles/userProfiles'
import { createAccessToken } from 'src/services/accessTokens/accessTokens'

export const registerUser = async (userId) => {
  try {
    let user,
      userProfile = null
    if ((userProfile = await fetchUserProfileByUserId(userId))) {
      if ((user = await UserWithProfile(userProfile))) {
        await createAccessToken(user.id)
      }
    }
    return user
  } catch (error) {
    throw new Error('Failed to register user')
  }
}
