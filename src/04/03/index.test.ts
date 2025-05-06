import { getGreet } from '.';
import * as Fetchers from '../fetchers';
import { httpError } from '../fetchers/fixtures';

jest.mock('../fetchers');

describe('getGreet', () => {

  test('データ取得成功時 : ユーザー名がない場合', async () => {
    // getMyProfileがresolveしたときの値を再現
    // jest.spyOn(対象のオブジェクト, 対象の関数名称);
    jest.spyOn(Fetchers, 'getMyProfile').mockResolvedValueOnce({
      id: 'xxxxx-123456',
      email: 'xxxxx@myapi.testing.com',
    });
    await expect(getGreet()).resolves.toBe('Hello, anonymous user!');
  });

  test('データ取得成功時 : ユーザー名がある場合', async () => {
    // getMyProfileがresolveしたときの値を再現
    // jest.spyOn(対象のオブジェクト, 対象の関数名称);
    jest.spyOn(Fetchers, 'getMyProfile').mockResolvedValueOnce({
      id: 'xxxxx-123456',
      email: 'xxxxx@myapi.testing.com',
      name: 'Taro Yamada',
    });
    await expect(getGreet()).resolves.toBe('Hello, Taro Yamada!');
  });

  test('データ取得失敗時', async () => {
    // getMyProfileがrejectしたときの値を再現
    jest.spyOn(Fetchers, 'getMyProfile').mockRejectedValueOnce(httpError);
    await expect(getGreet()).rejects.toMatchObject({
      err: {message: 'internal server error'},
    });
  });

  test('データ取得失敗時、エラー相当のデータが例外としてスローされる', async () => {
    expect.assertions(1);
    // getMyProfileがrejectしたときの値を再現
    jest.spyOn(Fetchers, 'getMyProfile').mockRejectedValueOnce(httpError);
    try {
      await getGreet();
    } catch(err) {
      expect(err).toMatchObject(httpError);
    }
  });

});