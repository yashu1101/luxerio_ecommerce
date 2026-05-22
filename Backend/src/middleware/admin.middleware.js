export const isAdmin = (req, res, next) => {
    try {
        if (req.user.role != 'admin') return res.status(401).json({ message: "Accese denied." })
        next()

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}