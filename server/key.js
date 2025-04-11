const crypto = require('crypto');
const key = `projectai+srvtech://${crypto.randomBytes(32).toString('hex')}?retryWrites=true&w=majority&appName=projectai.key`; // Generates a 64 character long key
console.log(key);
