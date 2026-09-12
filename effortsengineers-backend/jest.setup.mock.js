// jest.setup.mock.js
import { jest } from '@jest/globals';
import * as dbModule from "./config/db.js";

beforeEach(() => {
  jest.spyOn(dbModule.default, "query").mockImplementation(async (sql, params) => {
    if (sql.startsWith("INSERT INTO products")) {
      return {
        rows: [{
          id: 1,
          name: params[0],
          description: params[1],
          price: params[2],
          created_at: new Date()
        }]
      };
    }
    return { rows: [] };
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});
