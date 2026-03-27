import express from 'express'
import { getCategories, createCategory} from '../controllers/categoryControllers.js'
import { getInformation} from '../controllers/serviceProviderController.js'
import matchLogin from '../controllers/loginController.js'
import {providerSignup} from '../controllers/providerSignupController.js'
import upload from '../middleware/uploads.js';
import { customerSignup } from '../controllers/customerSignupController.js'
import userLogin from '../controllers/loginController.js'
import { authMiddleware, authorize } from '../middleware/authentication.js'
import { customerDashboard } from '../controllers/customerDashboardController.js'

const router = express.Router()

router.get('/categories', getCategories)
router.post('/categories', createCategory)
router.post('/login', matchLogin);
router.post('/providerSignup', upload.single("image"), providerSignup)
router.post('/CustomerSignup', upload.none(), customerSignup)
router.get('/serviceProviderinfo', getInformation)
router.get('/login', userLogin)
router.get('/customerDashboard', authMiddleware, authorize("customer"), customerDashboard);
// router.post('/serviceProviderinfo', setInformation)


export default router;