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
  githubRequest: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  githubRequest: async ({}, use) => {
    const context = await playwrightRequest.newContext({
      baseURL: "https://api.github.com",
      extraHTTPHeaders: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    await use(context);
    await context.dispose(); // clean up the context after the test
  },

  repositoryName: async ({ githubRequest }, use, testInfo) => {
    const repoName = `ApiTesting-${testInfo.testId}`;
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
