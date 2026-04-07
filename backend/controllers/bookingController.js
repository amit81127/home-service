import Booking from '../models/Booking.js';
import User from '../models/User.js';

export const createBooking = async (req, res) => {
  try {
    const { providerId, category, price } = req.body;
    const customerId = req.user.id;

    const newBooking = new Booking({
      customerId,
      providerId,
      category,
      price
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful!', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error during booking' });
  }
};

export const getCustomerBookings = async (req, res) => {
  try {
    const customerId = req.user.id;
    const bookings = await Booking.find({ customerId })
      .populate('providerId', 'fullname business_name phone')
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

export const getProviderBookings = async (req, res) => {
  try {
    const providerId = req.user.userId;
    const bookings = await Booking.find({ providerId })
      .populate('customerId', 'fullname phone email')
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};
