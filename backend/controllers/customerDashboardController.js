// if(user.role == 'customer'){
//     userResult = await pool.query(
//         `SELECT
//                 u.id,
//                 u.role,
//                 u.username,
//                 u.email,
//                 p.user_id,
//                 p.name,
//                 p.address,
//                 p.latitude,
//                 p.longitude
//             FROM users u
//             JOIN customer_info p
//             ON u.id = p.user_id
//             WHERE u.id = $1
//             ;`,
//         [user.id],
//       )
//   }

//    let userResult;
//     delete userResult.password;

export function customerDashboard(req, res){
    return res.status(200).json({
        message: "Customer Dashboard"
    })
}