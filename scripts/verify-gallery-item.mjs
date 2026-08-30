async function checkGallery() {
  const res = await fetch('http://localhost:3000/api/gallery');
  const data = await res.json();
  console.log('--- PUBLIC GALLERY API ITEMS ---');
  console.log(data.items);
  const found = data.items.find(i => i.title.includes('JSWSTEEL'));
  if (found) {
    console.log('🎉 SUCCESS: JSWSTEEL image is active in the Public Lookbook Gallery!', found);
  } else {
    console.error('❌ Not found');
  }
}
checkGallery();
