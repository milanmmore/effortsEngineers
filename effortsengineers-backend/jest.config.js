/* comment out as we need to use different setup files based on the environment variable USE_DB 
  export default {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.env.cjs"],
};
*/
// jest.config.js
export default {
  testEnvironment: "node",
  // Dynamically choose setup file based on USE_DB flag
  setupFilesAfterEnv: [
    process.env.USE_DB === "true"
      ? "<rootDir>/jest.setup.db.js"
      : "<rootDir>/jest.setup.mock.js"
  ],
  // Optional: clear mocks between tests
  clearMocks: true,
};
