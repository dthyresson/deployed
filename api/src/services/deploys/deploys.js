import { db } from 'src/lib/db'

export const deploys = () => {
  return db.deploy.findMany()
}

export const Deploy = {
  site: (_obj, { root }) =>
    db.deploy.findOne({ where: { id: root.id } }).site(),
  user: (_obj, { root }) =>
    db.deploy.findOne({ where: { id: root.id } }).user(),
}

export const persistDeployData = async (user, site, data) => {
  delete data.siteName
  delete data.siteId

  return await db.deploy.upsert({
    where: { id: data.id },
    update: {
      ...data,
    },
    create: {
      ...data,
      user: { connect: { id: user.id } },
      site: { connect: { id: site.id } },
    },
  })
}
