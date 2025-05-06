import type { Profile } from './type';

export function getMyProfile(): Promise<Profile> {
  return fetch('https://myapi.testing.com/my/profile').then(async (res) => {
    const data = await res.json();

    if(!res.ok) {
      // 200番台以外のレスポンスの場合
      throw data;
    }
    return data;
  });
}