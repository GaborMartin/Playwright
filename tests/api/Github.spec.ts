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

test("Should retrieve repository by name", async ({ request, repoName }) => {
  const response = await getRepository(request, USER, repoName);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.full_name).toBe(`${USER}/${repoName}`);
});

test("Should create a bug and verifies it's present in bugs list", async ({
  request,
  repoName,
}) => {
  const response = await createIssue(request, USER, repoName, bug);
  expect(response.status()).toBe(201);

  await waitForItemInList(async () => {
    const issues = await retrieveIssues(request, USER, repoName);
    return issues.json();
  }, bug);
});

test("Should star and unstar repository", async ({ request, repoName }) => {
  const initialCheck = await checkRepositoryStarred(request, USER, repoName);
  expect(initialCheck.status()).toBe(404);

  const starResponse = await starRepository(request, USER, repoName);
  expect(starResponse.status()).toBe(204);

  const starredCheck = await checkRepositoryStarred(request, USER, repoName);
  expect(starredCheck.status()).toBe(204);

  const unstarResponse = await unstarRepository(request, USER, repoName);
  expect(unstarResponse.status()).toBe(204);

  const finalCheck = await checkRepositoryStarred(request, USER, repoName);
  expect(finalCheck.status()).toBe(404);
});
