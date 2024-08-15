const {User} = require("../models/Models");

const getLastname = async (req,res) => {
    try{
        const userId = req.userId;

        const user = await User.findByPk(userId, {
            attributes: ['lastname']
        });

        if (!user){
            return res.status(404).json({ message: "user not found!" });
        }
        res.json({ lastname: user.lastname });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRisk = async (req,res) => {
    try{
        const userId = req.userId;

        const user = await User.findByPk(userId, {
            attributes: ['accountType']
        });

        if (!user){
            return res.status(404).json({ message: "user not found!" });
        }
        res.json({ accountType: user.accountType });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {getLastname, getRisk};