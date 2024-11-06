const express = require("express");
const router = express.Router();
const { initiateSTKPush } = require("./mpesaService");
const authMiddleware = require("./middleware/auth");

router.post("/purchase-package", authMiddleware, async (req, res) => {
  const { phoneNumber, amount } = req.body;

  if (!phoneNumber || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid phone number or amount" });
  }

  try {
    const result = await initiateSTKPush(phoneNumber, amount);
    res.json({
      message: "Package purchase initiated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to initiate package purchase" });
  }
});

// Handle M-Pesa STK Push callback for package purchase
router.post("/mpesa/package-callback", async (req, res) => {
  const result = req.body.Body.stkCallback;
  console.log("STK Push Callback:", result);

  if (result.ResultCode === 0) {
    // Successful payment
    const phoneNumber = result.CallbackMetadata.Item.find(
      (item) => item.Name === "PhoneNumber"
    ).Value;

    const amount = result.CallbackMetadata.Item.find(
      (item) => item.Name === "Amount"
    ).Value;

    console.log(`Package purchased for ${phoneNumber}: KES ${amount}`);
    // Update user package status in your database here (find by phone number)
  } else {
    console.log("Package purchase failed:", result.ResultDesc);
  }
  res.sendStatus(200); // Acknowledge receipt
});

// package.js - inside /mpesa/package-callback
if (result.ResultCode === 0) {
  const phoneNumber = result.CallbackMetadata.Item.find(
    (item) => item.Name === "PhoneNumber"
  ).Value;

  // Find and update user package status
  await User.findOneAndUpdate({ phoneNumber }, { packageStatus: true });

  console.log(`Package purchased and status updated for ${phoneNumber}`);
}

module.exports = router;
