const fs = require('fs');
const Client = require('bitcoin-core');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const client = new Client({ username: config.username, password: config.password });

var lastBlockHash = null;

function getInfo() {
  client.getBlockchainInfo().then((info) => {
    client.getBlockHash(info.blocks).then((blockHash) => {
      if(lastBlockHash != blockHash) {
        lastBlockHash = blockHash;
        client.getBlock(blockHash).then((block) => {
          console.log(new Date(block.time * 1000).toString());
        });
      }
    });
  });
}

setInterval(getInfo, 1000);
