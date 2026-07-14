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

test.describe("GitHub API tests", () => {
  test("Should retrieve repository by name", async ({
    githubRequest,
    repositoryName,
  }) => {
    const response = await getRepository(githubRequest, USER, repositoryName);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.full_name).toBe(`${USER}/${repositoryName}`);
  });

  test("Should create a bug and verifies it's present in bugs list", async ({
    githubRequest,
    repositoryName,
  }) => {
    const response = await createIssue(
      githubRequest,
      USER,
      repositoryName,
      bug,
    );
    expect(response.status()).toBe(201);

    await waitForItemInList(async () => {
      const issues = await retrieveIssues(githubRequest, USER, repositoryName);
      return issues.json();
    }, bug);
  });

  test("Should star and unstar repository", async ({
    githubRequest,
    repositoryName,
  }) => {
    await test.step("Verify repository is not starred initially", async () => {
      const initialCheck = await checkRepositoryStarred(
        githubRequest,
        USER,
        repositoryName,
      );
      expect(initialCheck.status()).toBe(404);
    });

    await test.step("Star the repository", async () => {
      const starResponse = await starRepository(
        githubRequest,
        USER,
        repositoryName,
      );
      expect(starResponse.status()).toBe(204);
    });

    await test.step("Verify repository is now starred", async () => {
      const starredCheck = await checkRepositoryStarred(
        githubRequest,
        USER,
        repositoryName,
      );
      expect(starredCheck.status()).toBe(204);
    });

    await test.step("Unstar the repository", async () => {
      const unstarResponse = await unstarRepository(
        githubRequest,
        USER,
        repositoryName,
      );
      expect(unstarResponse.status()).toBe(204);
    });

    await test.step("Verify repository is unstarred again", async () => {
      const finalCheck = await checkRepositoryStarred(
        githubRequest,
        USER,
        repositoryName,
      );
      expect(finalCheck.status()).toBe(404);
    });
  });
});
