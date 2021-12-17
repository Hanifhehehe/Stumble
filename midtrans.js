axios({
    // Below is the API URL endpoint
    url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from("SB-Mid-server-GwUP_WGbJPXsDzsNEBRs8IYA").toString("base64")
      // Above is API server key for the Midtrans account, encoded to base64
    },
    data:
      // Below is the HTTP request body in JSON
      {
        transaction_details: {
          order_id: "order-csb-" + getCurrentTimestamp(),
          gross_amount: 10000
        },
        credit_card: {
          secure: true
        },
        customer_details: {
          first_name: "Johny",
          last_name: "Kane",
          email: "testmidtrans@mailnesia.com",
          phone: "08111222333"
        }
      }
  }).then( snapResponse => { 
      let snapToken = snapResponse.data.token;
      console.log("Retrieved snap token:", snapToken);
      // Pass the Snap Token to frontend, render the HTML page
      res.send(getMainHtmlPage(snapToken, handleMainRequest));
    })

/**
 * Sample API HTTP response:
 * {
 *  "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862",
 *  "redirect_url":"https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55-fdac-4ef9-91b5-733b97d1b862"
 * }
 */
      