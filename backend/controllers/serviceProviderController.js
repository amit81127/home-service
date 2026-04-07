import User from "../models/User.js";
const BASE_URL = "/uploads/";

export const getInformation = async (req, res) => {
  try {
    const { category } = req.query;
    let providers;
    
    if (category == "Popular") {
        providers = await User.find({ role: 'service_provider' })
                              .sort({ rating: -1 })
                              .limit(8);
    } else {
        providers = await User.find({ role: 'service_provider', category: category });
    }

    const formattedProviders = providers.map((provider) => ({
      user_id: provider._id,
      name: provider.name,
      image_url: provider.image_url ? BASE_URL + provider.image_url : null,
      category: provider.category,
      address: provider.address,
      rating: provider.rating,
      price: provider.price,
      business_name: provider.business_name
    }));

    res.status(200).json(formattedProviders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const providerDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userObj = user.toObject();
    if (userObj.image_url) {
      userObj.image_url = BASE_URL + userObj.image_url;
    }
    return res.status(200).json({
      user: userObj
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
