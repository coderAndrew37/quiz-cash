const axios = require("axios");
require("dotenv").config();

// Fetch environment variables
const {
  DARAJA_CONSUMER_KEY,
  DARAJA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_INITIATOR_NAME,
  MPESA_SECURITY_CREDENTIAL,
  CALLBACK_URL,
  MPESA_ENV,
} = process.env;

const BASE_URL =
  MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

// Step 1: Obtain OAuth Token
async function getOAuthToken() {
  const auth = Buffer.from(
    `${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.get(
      `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error obtaining OAuth token:", error.response.data);
    throw new Error("Failed to get OAuth token");
  }
}

// Step 2: Initiate STK Push (withdrawal to customer)

async function initiateSTKPush(phoneNumber, amount) {
  const accessToken = await getOAuthToken();
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = Buffer.from(
    `${STK_SHORTCODE}${STK_PASSKEY}${timestamp}`
  ).toString("base64");

  try {
    const response = await axios.post(
      `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: STK_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: STK_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: `${CALLBACK_URL}/package`,
        AccountReference: "PackagePurchase",
        TransactionDesc: "Package purchase for withdrawal",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error initiating STK Push:", error.response.data);
    throw new Error("Failed to initiate M-Pesa STK Push");
  }

  // Step 2: Initiate B2C Payment (withdrawal to customer)
  async function initiateB2CWithdrawal(phoneNumber, amount) {
    const accessToken = await getOAuthToken();

    try {
      const response = await axios.post(
        `${BASE_URL}/mpesa/b2c/v1/paymentrequest`,
        {
          InitiatorName: MPESA_INITIATOR_NAME,
          SecurityCredential: MPESA_SECURITY_CREDENTIAL,
          CommandID: "BusinessPayment",
          Amount: amount,
          PartyA: MPESA_SHORTCODE,
          PartyB: phoneNumber,
          Remarks: "Withdrawal to M-Pesa",
          QueueTimeOutURL: `${CALLBACK_URL}/timeout`,
          ResultURL: `${CALLBACK_URL}/result`,
          Occasion: "Withdrawal",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error initiating B2C withdrawal:", error.response.data);
      throw new Error("Failed to initiate M-Pesa withdrawal");
    }
  }
}
module.exports = { initiateB2CWithdrawal };
