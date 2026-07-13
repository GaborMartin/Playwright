import { APIRequestContext, APIResponse, expect } from "@playwright/test";

/**
 * Creates a new GitHub repository for the authenticated user.
 */
export async function createRepository(
  request: APIRequestContext,
  repository: string,
): Promise<APIResponse> {
  return request.post(`/user/repos`, {
    data: { name: repository },
  });
}

/**
 * Retrieves a repository by name
 */
export async function getRepository(
  request: APIRequestContext,
  user: string,
  repository: string,
): Promise<APIResponse> {
  return await request.get(`/repos/${user}/${repository}`);
}

/**
 * Deletes a GitHub repository.
 */
export async function deleteRepository(
  request: APIRequestContext,
  user: string,
  repository: string,
): Promise<APIResponse> {
  return request.delete(`/repos/${user}/${repository}`);
}

/**
 * Creates a bug.
 */
export async function createBug(
  request: APIRequestContext,
  user: string,
  repository: string,
  data: { title: string; body: string },
): Promise<APIResponse> {
  return request.post(`/repos/${user}/${repository}/issues`, {
    data: {
      title: data.title,
      body: data.body,
    },
  });
}

/**
 * Retrieves a list of bugs for a repository.
 */
export async function getBugs(
  request: APIRequestContext,
  user: string,
  repository: string,
): Promise<APIResponse> {
  return request.get(`/repos/${user}/${repository}/issues`);
}

/**
 * Polls a list-returning API call until it contains an item matching the expected shape.
 */
export async function waitForItemInList<T>(
  getList: () => Promise<T[]>,
  expectedItem: Partial<T>,
  timeout = 10000,
): Promise<void> {
  await expect
    .poll(getList, { timeout })
    .toContainEqual(expect.objectContaining(expectedItem));
}
