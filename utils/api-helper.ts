import { APIRequestContext, APIResponse, expect } from "@playwright/test";

const endpoints = {
  userRepos: () => `/user/repos`,
  repo: (user: string, repository: string) => `/repos/${user}/${repository}`,
  issues: (user: string, repository: string) =>
    `/repos/${user}/${repository}/issues`,
  starred: (user: string, repository: string) =>
    `/user/starred/${user}/${repository}`,
};

/**
 * Creates a new GitHub repository for the authenticated user.
 */
export async function createRepository(
  request: APIRequestContext,
  repository: string,
): Promise<APIResponse> {
  return request.post(endpoints.userRepos(), {
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
  return request.get(endpoints.repo(user, repository));
}

/**
 * Deletes a GitHub repository.
 */
export async function deleteRepository(
  request: APIRequestContext,
  user: string,
  repository: string,
): Promise<APIResponse> {
  return request.delete(endpoints.repo(user, repository));
}

/**
 * Creates a new issue.
 */
export async function createIssue(
  request: APIRequestContext,
  user: string,
  repository: string,
  data: { title: string; body: string },
): Promise<APIResponse> {
  return request.post(endpoints.issues(user, repository), {
    data: {
      title: data.title,
      body: data.body,
    },
  });
}

/**
 * Retrieves a list of issues for a repository.
 */
export async function retrieveIssues(
  request: APIRequestContext,
  user: string,
  repository: string,
): Promise<APIResponse> {
  return request.get(endpoints.issues(user, repository));
}

/**
 * Retrieves a starred repository for a user.
 */
export async function checkRepositoryStarred(
  request: APIRequestContext,
  user: string,
  repository: string,
): Promise<APIResponse> {
  return request.get(endpoints.starred(user, repository));
}

/**
 * Stars a repository.
 */
export async function starRepository(
  request: APIRequestContext,
  user: string,
  repository: string,
): Promise<APIResponse> {
  return request.put(endpoints.starred(user, repository));
}

/**
 * Unstars a repository.
 */
export async function unstarRepository(
  request: APIRequestContext,
  user: string,
  repository: string,
): Promise<APIResponse> {
  return request.delete(endpoints.starred(user, repository));
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
