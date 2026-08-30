async function testShivLogin() {
  console.log('Testing Admin login with username shiv1 and password @Asdf1234...');

  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'shiv1',
      password: '@Asdf1234',
    }),
  });

  console.log('Status:', res.status);
  const data = await res.json();
  console.log('Response:', data);

  if (res.ok && data.user && data.user.role === 'super_admin') {
    console.log('🎉 SUCCESS: Admin shiv1 authenticated with super_admin privileges!');
  } else {
    console.error('❌ FAILED: Login failed for shiv1');
  }
}

testShivLogin();
