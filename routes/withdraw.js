const express = require("express");
const router = express.Router();
const { initiateB2CWithdrawal } = require("./mpesaService");
const authMiddleware = require("./middleware/auth");

router.post("/withdraw", authMiddleware, async (req, res) => {
  const { phoneNumber, amount } = req.body;

  // Find the user and check package status
  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.packageStatus) {
    return res.status(403).json({
      message: "You need to purchase a package before making a withdrawal.",
    });
  }

  try {
    const result = await initiateB2CWithdrawal(phoneNumber, amount);
    res.json({
      message: "Withdrawal request sent successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to initiate withdrawal" });
  }
});

module.exports = router;
