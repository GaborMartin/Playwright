import { test, expect } from "fixtures/api-fixtures";
import {
  createIssue,
  retrieveIssues,
  getRepository,
  waitForItemInList,
} from "utils/api-helper";
import { bug, USER } from "testdata/constants";

test("Should retrieve repository by name", async ({ request, repoName }) => {
  const response = await getRepository(request, USER, repoName);
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  expect(responseBody.full_name).toBe(`${USER}/${repoName}`);
});

test("Should create a bug and verifies it's present in bugs list", async ({
  request,
  repoName,
}) => {
  const response = await createIssue(request, USER, repoName, bug);
  expect(response.ok()).toBeTruthy();

  await waitForItemInList(async () => {
    const issues = await retrieveIssues(request, USER, repoName);
    return issues.json();
  }, bug);
});
