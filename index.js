#! /usr/bin/env node

const https = require('https');
const colors = require('colors');

const artist = process.argv[2];
const album = process.argv[3];
const coverSize = process.argv[4];

const API = `https://itunes.apple.com/search?media=music&entity=album&term=`

https
  .get(`${API}${artist} ${album}`, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const { results: [result] } = JSON.parse(data);

      if (!result) {
        console.log('No results =(');
        return;
      }

      console.log();
      console.log(result.artworkUrl100.replace('100x100', `${coverSize}x${coverSize}`).yellow);
    });
  })
  .on('error', (error) => {
    throw new Error(error);
    return;
  });;
