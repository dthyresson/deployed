import * as dotenv from 'dotenv'

import { db } from 'src/lib/db'

dotenv.config()

export const users = () => {
  return db.user.findMany()
}

export const User = {
  sites: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).sites(),
  deploys: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).deploys(),
}
