async function testUploadedImage() {
  console.log('Testing GET http://localhost:3000/uploads/uploads/JSWSTEEL_GUGD_20260616_1787716884125.png...');

  const res = await fetch('http://localhost:3000/uploads/uploads/JSWSTEEL_GUGD_20260616_1787716884125.png');
  console.log('HTTP Status:', res.status);
  console.log('Content-Type:', res.headers.get('content-type'));
  console.log('Content-Length:', res.headers.get('content-length'));

  if (res.ok && res.headers.get('content-type') === 'image/png') {
    console.log('🎉 SUCCESS: Uploaded image served with 200 OK and valid image/png MIME!');
  } else {
    console.error('❌ FAILED: Could not serve image');
  }
}

testUploadedImage();
