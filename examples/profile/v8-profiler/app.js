const fs = require("fs");
const crypto = require("crypto");
const app = require("express")();
const Bluebird = require("bluebird");
const profiler = require("v8-profiler-next");
app.get("/encrypt", (req, res, next) => {
  const password = req.query.password || "test";
  const salt = crypto.randomBytes(128).toString("base64");
  const encryptedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  res.end(encryptedPassword);
});
app.get("/cpu_profile", async (req, res, next) => {
  profiler.startProfiling("CPU profile");
  await Bluebird.delay(30000);
  const profile = profiler.stopProfiling();
  profile
    .export()
    .pipe(fs.createWriteStream(`cpuprofile-${Date.now()}.cpuprofile`))
    .on("finish", () => profile.delete());
  res.end("ok");
});

app.listen(3000, () => {
  console.log("listen at: http://127.0.0.1:3000");
});