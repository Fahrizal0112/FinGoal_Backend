const { Saving, User } = require("../models/Models");

const CreateSavings = async (req, res) => {
    try {
        const Ownerid = req.userId;

        const { goal, moneygoal, duration, frequency, monthly } = req.body;

        if (!moneygoal || !frequency || !monthly || !duration) {
            return res.status(400).json({ message: "moneygoal, frequency, monthly, dan duration tidak boleh kosong." });
        }

        const user = await User.findByPk(Ownerid);
        if (!user) return res.status(404).json({ message: "Pengguna tidak ditemukan." });

        const totalMoneyGoal = parseFloat(moneygoal); 
        const monthlySaving = parseFloat(monthly);
        const savingDuration = parseInt(duration); 
        let totalAccumulation = 0;
        let timeNeeded = 0;
        let timeUnit = "";

        if (frequency === "Harian") {
            totalAccumulation = monthlySaving * savingDuration; 
            timeUnit = "hari";
            timeNeeded = totalMoneyGoal / monthlySaving; 
        } else if (frequency === "Bulanan") {
            totalAccumulation = monthlySaving * savingDuration; 
            timeUnit = "bulan";
            timeNeeded = totalMoneyGoal / monthlySaving; 
        } else if (frequency === "Tahunan") {
            totalAccumulation = monthlySaving * savingDuration; 
            timeUnit = "tahun";
            timeNeeded = totalMoneyGoal / monthlySaving; 
        }

        let recommendation = "";

        if (totalAccumulation >= totalMoneyGoal) {
            recommendation = "Tujuan Anda sudah pas! Anda akan mencapai goal Anda dalam waktu yang telah ditentukan.";
        } else {
            const shortfall = totalMoneyGoal - totalAccumulation;
            recommendation = `Dengan menabung ${monthly} per ${frequency.toLowerCase()}, Anda akan membutuhkan sekitar ${Math.ceil(timeNeeded)} ${timeUnit} untuk mencapai goal Anda sebesar ${moneygoal}. `;
            
            if (frequency === "Harian") {
                const additionalPerDay = Math.ceil(shortfall / savingDuration);
                recommendation += `Atau Anda dapat menambah tabungan harian Anda menjadi ${monthly + additionalPerDay} untuk mencapai tujuan.`;
            } else if (frequency === "Bulanan") {
                const additionalPerMonth = Math.ceil(shortfall / savingDuration);
                recommendation += `Atau Anda dapat menambah tabungan bulanan Anda menjadi ${monthly + additionalPerMonth} untuk mencapai tujuan.`;
            } else if (frequency === "Tahunan") {
                const additionalPerYear = Math.ceil(shortfall / savingDuration);
                recommendation += `Atau Anda dapat menambah tabungan tahunan Anda menjadi ${monthly + additionalPerYear} untuk mencapai tujuan.`;
            }
        }

        if (user.accountType === 'Konservatif') {
            recommendation += "Kami merekomendasikan Anda untuk berinvestasi di reksa dana pasar uang.";
        } else if (user.accountType === 'Moderat') {
            recommendation += "Kami merekomendasikan Anda untuk berinvestasi di reksa dana campuran.";
        } else if (user.accountType === 'Agresif') {
            recommendation += "Kami merekomendasikan Anda untuk berinvestasi di saham atau reksa dana saham.";
        }

        const newSaving = await Saving.create({
            Ownerid,
            goal,
            moneygoal,
            duration,
            frequency,
            monthly
        });

        res.status(201).json({
            message: "Data tabungan berhasil disimpan.",
            data: newSaving,
            recommendation
        });

    } catch (error) {
        console.error("Error creating saving:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat menyimpan data tabungan." });
    }
};

module.exports = { CreateSavings };
