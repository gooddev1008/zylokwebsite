const fetch = require("node-fetch");

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const name = data.name;
  const email = data.email;
  const phone = data.phone;

  const message = `
🔥 New Salon Lead

🏪 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
  `;

  const TOKEN = "8725396159:AAEEskTHSwqoJs1yv_oLpC8YGfvsZWvFEOQ";
  const CHAT_ID = "67994137";

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};