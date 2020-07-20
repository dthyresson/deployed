import {
  fetchUserProfileByUserId,
  updateUserWithProfile,
} from 'src/services/userManager/userManager'

export const signIn = async (userId) => {
  try {
    const userProfile = await fetchUserProfileByUserId(userId)
    const user = await updateUserWithProfile(userProfile)

    return user
  } catch (error) {
    throw new Error('Failed to signin user')
  }
}
