export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = request.body;
  if (!email) {
    return response.status(400).json({ error: 'Email is vereist' });
  }

  // Fallback naar de hardcoded key als de environment variable nog niet is ingesteld op Vercel
  const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_gQC3Uyt7_NCC9vNfMT6rBGAr2A9ddYvw5";

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Website Aanvraag <onboarding@resend.dev>', // Resend test domein
        to: 'nick@vankampendigital.nl',
        subject: 'Nieuwe aanvraag via website — VAN KAMPEN Digital',
        html: `<p>Nieuw e-mailadres achtergelaten op de website: <strong>${email}</strong></p>`
      })
    });

    const data = await res.json();
    
    if (res.ok) {
      return response.status(200).json(data);
    } else {
      return response.status(res.status).json(data);
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
