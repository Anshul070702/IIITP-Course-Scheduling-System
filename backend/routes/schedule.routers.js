import {getSchedule} from '../controllers/schedule.controllers.js'
import { getPastSchedule } from "../controllers/schedule.controllers.js"
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const router = Router()

router.route( "/getschedule" ).get( verifyJWT, getSchedule )
router.route( "/getpastschedule").get(verifyJWT, getPastSchedule)


export default router