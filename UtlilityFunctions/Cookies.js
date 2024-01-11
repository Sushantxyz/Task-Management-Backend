

const CreateCookie = (res, token) => {
    res.cookie("Token", token, {
        httpsonly: true,
        maxage: 1000 * 60 * 15,
        sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    }).json({
        success: true,
        message: "Logged in sucessfully"
    });

}

export const deletecookie = (res, token) => {
    res.status(200).cookie(token, "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    }).json({
        success: true,
        message: "Logout successfully"
    })
}

export default CreateCookie;