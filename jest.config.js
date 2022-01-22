/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./test/setup.ts"],
};
