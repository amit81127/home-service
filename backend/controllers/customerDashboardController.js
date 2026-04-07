import User from "../models/User.js";

export async function customerDashboard(req, res){
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            user: user
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}