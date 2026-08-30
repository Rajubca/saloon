async function debug() {
  const payload = {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '9825199999',
    service_or_product: 'Russian Nano-Plastia & Keratin Treatment',
    inquiry_type: 'appointment',
    preferred_date: '2026-09-10',
    preferred_branch: 'Ajwa Road Studio',
    message: 'Looking for a complete hair smoothing consultation with Rajesh Joshi.',
  };

  const res = await fetch('http://localhost:3000/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  console.log('Status:', res.status);
  const data = await res.json();
  console.log('Response:', data);
}

debug();
