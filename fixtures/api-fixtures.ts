import { test as base, expect } from "@playwright/test";
import { createRepository, deleteRepository } from "../utils/api-helper";
import { USER } from "testdata/constants";

type ApiFixtures = {
  repository: string;
};

export const test = base.extend<ApiFixtures>({
  repository: async ({ request }, use, testInfo) => {
    const repoName = `ApiTesting-${testInfo.testId}`;
    const createResponse = await createRepository(request, repoName);
    expect(createResponse.status()).toBe(201);

    await use(repoName);

    const deleteResponse = await deleteRepository(request, USER, repoName);
    expect(deleteResponse.status()).toBe(204);
  },
});

export { expect };
