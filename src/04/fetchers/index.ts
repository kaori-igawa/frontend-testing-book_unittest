import type { Articles, Profile } from './type';

async function handleResponse(res: Response) {
  const data = await res.json();

  if(!res.ok) {
    // 200番台以外のレスポンスの場合
    throw data;
  }
  return data;
}

const host = (path: string) => `https://myapi.testing.com${path}`;

export function getMyProfile(): Promise<Profile> {
  return fetch(host('/my/profile')).then(handleResponse);
}

export function getMyArticles(): Promise<Articles> {
  return fetch(host('/my/articles')).then(handleResponse);
}