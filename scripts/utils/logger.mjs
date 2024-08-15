export default {
  info(msg) {
    console.log(`\x1b[33m ${msg} \x1b[0m`);
  },
  err(msg) {
    console.error(`\x1b[31m ${msg} \x1b[0m`);
  },
  success(msg) {
    console.log(`\x1b[32m ${msg} \x1b[0m`);
  },
};
