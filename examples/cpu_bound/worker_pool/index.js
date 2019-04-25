const crypto = require("crypto");
const delay = require("delay");
const randomstring = require("randomstring");
(async () => {
  while (true) {
    await delay(1);
    const password = randomstring.generate();
    const salt = randomstring.generate();
    crypto.pbkdf2(password, salt, 10000, 512, "sha512",(err,encryptHash) => {
      //console.log("encryptHash", encryptHash);
    });
    crypto.pbkdf2(password, salt, 10000, 512, "sha512",(err,encryptHash) => {
      //console.log("encryptHash2", encryptHash);
    });
  }
})();
