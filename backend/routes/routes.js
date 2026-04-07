import express from 'express'
import { getCategories, createCategory } from '../controllers/categoryControllers.js'
import { getInformation, providerDashboard } from '../controllers/serviceProviderController.js'
import userLogin from '../controllers/loginController.js'
import { providerSignup } from '../controllers/providerSignupController.js'
import upload from '../middleware/uploads.js';
import { customerSignup } from '../controllers/customerSignupController.js'
import { authMiddleware, authorize } from '../middleware/authentication.js'
import { customerDashboard } from '../controllers/customerDashboardController.js'
import { createBooking, getCustomerBookings, getProviderBookings } from '../controllers/bookingController.js'

const router = express.Router()

router.get('/categories', getCategories)
router.post('/categories', createCategory)
router.post('/login', userLogin);
router.post('/providerSignup', upload.single("image"), providerSignup)
router.post('/CustomerSignup', upload.none(), customerSignup)
router.get('/serviceProviderinfo', getInformation)
router.get('/customerDashboard', authMiddleware, authorize("customer"), customerDashboard);
router.get('/providerDashboard', authMiddleware, authorize("service_provider"), providerDashboard);

// Booking routes
router.post('/bookings', authMiddleware, authorize("customer"), createBooking)
router.get('/customer/bookings', authMiddleware, authorize("customer"), getCustomerBookings)
router.get('/provider/bookings', authMiddleware, authorize("service_provider"), getProviderBookings)

export default router;