import { AuthenticationClient, ManagementClient } from 'auth0'
import { nanoid } from 'nanoid'

import { db } from 'src/lib/db'

const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
})

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  scope: 'read:users update:users',
})

export const createUser = async (data) => {
  try {
    return await db.user.create(data)
  } catch (error) {
    console.log(error)
  }
}

export const upsertUser = async (data) => {
  try {
    return await db.user.upsert({
      where: { userIdentity: data.userIdentity },
      update: {},
      create: { userIdentity: data.userIdentity, emailVerified: false },
      include: { accessTokens: true },
    })
  } catch (error) {
    console.log(error)
  }
}

export const userByUserId = async (userId) => {
  return await db.user.findOne({
    where: {
      userIdentity: userId,
    },
  })
}

export const fetchUserProfileByUserId = async (userId) => {
  try {
    const auth0User = await management.users.get({ id: userId })

    return {
      email: auth0User.email,
      emailVerified: auth0User.email_verified,
      lastIp: auth0User.last_ip,
      lastLogin: auth0User.last_login,
      loginsCount: auth0User.logins_count,
      name: auth0User.name,
      nickname: auth0User.nickname,
      picture: auth0User.picture,
      userId: auth0User.user_id,
    }
  } catch (error) {
    console.log(error)
    throw new Error('Could not fetch user')
  }
}

export const fetchUserProfileByToken = async (token) => {
  try {
    const auth0User = await auth0.getProfile(token)
    return {
      email: auth0User.email,
      emailVerified: auth0User.email_verified,
      name: auth0User.name,
      nickname: auth0User.nickname,
      picture: auth0User.picture,
      userId: auth0User.user_id,
    }
  } catch (error) {
    console.log(error)
    throw new Error('Could not fetch profile')
  }
}

export const updateUserWithProfile = async (userProfile) => {
  try {
    const userWithProfile = await db.user.upsert({
      where: {
        userIdentity: userProfile.userId,
      },
      update: {
        email: userProfile.email,
        emailVerified: userProfile.emailVerified,
        lastIp: userProfile.lastIp,
        lastLogin: userProfile.lastLogin,
        loginsCount: userProfile.loginsCount,
        name: userProfile.name,
        nickname: userProfile.nickname,
        picture: userProfile.picture,
      },
      create: {
        email: userProfile.email,
        emailVerified: userProfile.emailVerified,
        lastIp: userProfile.lastIp,
        lastLogin: userProfile.lastLogin,
        loginsCount: userProfile.loginsCount,
        name: userProfile.name,
        nickname: userProfile.nickname,
        picture: userProfile.picture,
        userIdentity: userProfile.userId,
      },
    })

    return userWithProfile
  } catch (error) {
    throw new Error('Failed to update user and profile')
  }
}

export const getUserByAccessToken = async (secret) => {
  try {
    const accessToken = await db.accessToken.findOne({
      where: {
        secret: secret,
      },
      include: { user: true },
    })
    return accessToken.user
  } catch (error) {
    console.log(error)
    return null
  }
}

export const createAccessToken = async (userId) => {
  try {
    const tokenData = {
      user: { connect: { id: userId } },
      name: 'Access Token',
      secret: nanoid(32),
    }

    const accessToken = await db.accessToken.create({ data: tokenData })
    return accessToken
  } catch (error) {
    throw new Error('Could not create user access token')
  }
}
