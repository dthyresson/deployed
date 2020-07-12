// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import * as dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

export const db = new PrismaClient()
