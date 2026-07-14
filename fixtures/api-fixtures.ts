import {
  APIRequestContext,
  test as base,
  expect,
  request as playwrightRequest,
} from "@playwright/test";
import { createRepository, deleteRepository } from "../utils/api-helper";
import { USER } from "testdata/constants";

type ApiFixtures = {
  repositoryName: string;
};

type ApiWorkerFixtures = {
  githubRequest: APIRequestContext;
};

export const test = base.extend<ApiFixtures, ApiWorkerFixtures>({
  githubRequest: [
    async ({}, use) => {
      const context = await playwrightRequest.newContext({
        baseURL: "https://api.github.com",
        extraHTTPHeaders: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "X-GitHub-Api-Version": "2026-03-10",
        },
      });
      await use(context);
      await context.dispose();
    },
    { scope: "worker" },
  ],

  repositoryName: async ({ githubRequest }, use, testInfo) => {
    const repoName = `ApiTesting-${testInfo.testId}-${Date.now()}`;
    const createResponse = await createRepository(githubRequest, repoName);
    expect(createResponse.status()).toBe(201);

    await use(repoName);

    const deleteResponse = await deleteRepository(
      githubRequest,
      USER,
      repoName,
    );
    expect(deleteResponse.status()).toBe(204);
  },
});

export { expect };
