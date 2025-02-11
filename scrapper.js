const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.uninorte.edu.co/';

async function countHeadingTags(url, proxyUrl = null) {
    try {
        
        const config = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Connection': 'keep-alive',
            },
            timeout: 5000
        };

        if (proxyUrl) {
            config.proxy = {
                host: proxyUrl,
                port: 8080
            };
        }

        const response = await axios.get(url, config);

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = response.data;
        const $ = cheerio.load(html);

        const counts = {
            h1: $('h1').length,
            h2: $('h2').length,
            h3: $('h3').length,
            h4: $('h4').length,
            h5: $('h5').length,
            h6: $('h6').length
        };

        counts.total = counts.h1 + counts.h2 + counts.h3 + counts.h4 + counts.h5 + counts.h6;

        // Print detailed results
        console.log('Heading Tags Analysis:');
        console.log('=====================');
        console.log(`H1 tags: ${counts.h1}`);
        console.log(`H2 tags: ${counts.h2}`);
        console.log(`H3 tags: ${counts.h3}`);
        console.log(`H4 tags: ${counts.h4}`);
        console.log(`H5 tags: ${counts.h5}`);
        console.log(`H6 tags: ${counts.h6}`);
        console.log('=====================');
        console.log(`Total heading tags: ${counts.total}`);

        return counts;

    } catch (error) {
        console.error('Error occurred while scraping:');
        console.error(`Type: ${error.name}`);
        console.error(`Message: ${error.message}`);
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Headers: ${JSON.stringify(error.response.headers, null, 2)}`);
        }
        return null;
    }
}

countHeadingTags(url);