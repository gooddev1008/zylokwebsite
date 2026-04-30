exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);

    const text = `
🔥 New Salon Lead — Zylok

🏪 Salon: ${data.salonName || "—"}
👤 Owner: ${data.ownerName || "—"}
📧 Email: ${data.email || "—"}
📱 Phone: ${data.phone || "—"}
🏙️ City: ${data.city || "—"}
🔢 Branches: ${data.branches || "—"}
👥 Team size: ${data.staffSize || "—"}
✂️ Services: ${data.services || "—"}${data.address ? `\n📍 Address: ${data.address}` : ""}${data.website ? `\n🌐 Website/IG: ${data.website}` : ""}${data.message ? `\n💬 Note: ${data.message}` : ""}
📰 Newsletter: ${data.newsletter || "No"}
    `.trim();

    const TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });

    const result = await response.json();

    if (!result.ok) {
      return { statusCode: 500, body: JSON.stringify({ error: result.description }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};