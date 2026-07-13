// utils/fixtures/api-fixtures.ts
import { test as base, expect } from "@playwright/test";
import { createRepository, deleteRepository } from "../utils/api-helper";
import { USER } from "testdata/constants";

type ApiFixtures = {
  repoName: string;
};

export const test = base.extend<ApiFixtures>({
  repoName: async ({ request }, use, testInfo) => {
    const repoName = `ApiTesting-${testInfo.testId}`;
    const createResponse = await createRepository(request, repoName);
    expect(createResponse.ok()).toBeTruthy();

    await use(repoName);

    const deleteResponse = await deleteRepository(request, USER, repoName);
    expect(deleteResponse.ok()).toBeTruthy();
  },
});

export { expect };
