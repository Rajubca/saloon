async function verifySchemaAndMobileBar() {
  console.log('🧪 Verifying Schema.org JSON-LD and Mobile Sticky Action Bar...');

  try {
    const res = await fetch('http://localhost:3000/');
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const html = await res.text();

    // Check JSON-LD
    const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    if (!jsonLdMatches || jsonLdMatches.length === 0) {
      throw new Error('❌ FAILED: No application/ld+json script tags found in HTML!');
    }

    console.log(`✅ Found ${jsonLdMatches.length} Schema.org JSON-LD blocks.`);

    let hasBeautySalon = false;
    let hasRating = false;
    let hasFAQ = false;

    for (const match of jsonLdMatches) {
      const jsonStr = match.replace(/<script type="application\/ld\+json">|<\/script>/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      if (parsed['@type'] === 'BeautySalon') {
        hasBeautySalon = true;
        if (parsed.aggregateRating?.ratingValue === '4.9') {
          hasRating = true;
          console.log(`🌟 Verified AggregateRating Schema: ${parsed.aggregateRating.ratingValue}★ (${parsed.aggregateRating.reviewCount} reviews)`);
        }
      }
      if (parsed['@type'] === 'FAQPage') {
        hasFAQ = true;
        console.log(`❓ Verified FAQPage Schema: ${parsed.mainEntity?.length || 0} Questions indexed`);
      }
    }

    if (hasBeautySalon && hasRating && hasFAQ) {
      console.log('🎉 SUCCESS: All Schema.org Rich Snippets validated successfully!');
    } else {
      console.error('⚠️ Warning: Some Schema blocks missing');
    }

    // Check Mobile Sticky Bar in HTML
    if (html.includes('Call Now') && html.includes('WhatsApp') && html.includes('Book VIP')) {
      console.log('📱 SUCCESS: Mobile Sticky Action Bar verified in DOM!');
    } else {
      console.error('❌ FAILED: Mobile Sticky Bar not found in DOM');
    }

  } catch (err) {
    console.error('Validation error:', err.message);
  }
}

verifySchemaAndMobileBar();
