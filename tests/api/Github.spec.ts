import { test, expect } from "fixtures/api-fixtures";
import {
  checkRepositoryStarred,
  createIssue,
  getRepository,
  retrieveIssues,
  starRepository,
  unstarRepository,
  waitForItemInList,
} from "utils/api-helper";
import { bug, USER } from "testdata/constants";
import { describe } from "node:test";

describe("GitHub API tests", () => {
  test("Should retrieve repository by name", async ({
    request,
    repository,
  }) => {
    const response = await getRepository(request, USER, repository);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.full_name).toBe(`${USER}/${repository}`);
  });

  test("Should create a bug and verifies it's present in bugs list", async ({
    request,
    repository,
  }) => {
    const response = await createIssue(request, USER, repository, bug);
    expect(response.status()).toBe(201);

    await waitForItemInList(async () => {
      const issues = await retrieveIssues(request, USER, repository);
      return issues.json();
    }, bug);
  });

  test("Should star and unstar repository", async ({ request, repository }) => {
    const initialCheck = await checkRepositoryStarred(
      request,
      USER,
      repository,
    );
    expect(initialCheck.status()).toBe(404);

    const starResponse = await starRepository(request, USER, repository);
    expect(starResponse.status()).toBe(204);

    const starredCheck = await checkRepositoryStarred(
      request,
      USER,
      repository,
    );
    expect(starredCheck.status()).toBe(204);

    const unstarResponse = await unstarRepository(request, USER, repository);
    expect(unstarResponse.status()).toBe(204);

    const finalCheck = await checkRepositoryStarred(request, USER, repository);
    expect(finalCheck.status()).toBe(404);
  });
});
