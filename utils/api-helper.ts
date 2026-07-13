import { APIRequestContext, APIResponse } from "@playwright/test";

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
