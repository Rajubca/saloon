async function diagnose() {
  const res = await fetch('http://localhost:3000/');
  console.log('Status:', res.status);
  console.log('Headers:', Object.fromEntries(res.headers.entries()));
  const text = await res.text();
  console.log('First 500 chars:', text.slice(0, 500));
}
diagnose();
