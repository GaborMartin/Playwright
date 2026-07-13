import { test, expect } from "fixtures/api-fixtures";
import {
  createBug,
  createRepository,
  deleteRepository,
  getBugs,
  getRepository,
  waitForItemInList,
} from "utils/api-helper";
import { USER } from "utils/constants";

const bug = {
  title: "[Bug] report 1",
  body: "Bug description",
};

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
  const response = await createBug(request, USER, repoName, bug);
  expect(response.ok()).toBeTruthy();

  await waitForItemInList(async () => {
    const bugs = await getBugs(request, USER, repoName);
    return bugs.json();
  }, bug);
});
