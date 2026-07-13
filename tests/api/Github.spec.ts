import test, { expect, request } from "@playwright/test";
import {
  createRepository,
  deleteRepository,
  getRepository,
} from "utils/api-helper";

const REPO = "ApiTesting";
const USER = "GaborMartin";

test.beforeAll(async ({ request }) => {
  const response = await createRepository(request, REPO);
  expect(response.ok()).toBeTruthy();
});

test("Should get repository by name", async ({ request }) => {
  const response = await getRepository(request, USER, REPO);
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  expect(responseBody.full_name).toBe(`${USER}/${REPO}`);
});

test.afterAll(async ({ request }) => {
  const response = await deleteRepository(request, USER, REPO);
  expect(response.ok()).toBeTruthy();
});
