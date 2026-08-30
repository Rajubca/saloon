async function checkMenuItems() {
  const res = await fetch('http://localhost:3000/api/menus');
  const data = await res.json();
  console.log('Total menu items in API:', data.items.length);
  
  const footer1 = data.items.filter(i => i.menu_location === 'footer_col_1');
  const footer2 = data.items.filter(i => i.menu_location === 'footer_col_2');
  const footer3 = data.items.filter(i => i.menu_location === 'footer_col_3');
  
  console.log('Footer Col 1:', footer1.map(i => i.title));
  console.log('Footer Col 2:', footer2.map(i => i.title));
  console.log('Footer Col 3:', footer3.map(i => i.title));
}

checkMenuItems().catch(console.error);
