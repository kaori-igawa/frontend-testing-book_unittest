import { wait, timeout } from '.';

describe('非同期処理', () => {
  describe('wait', () => {
    test('指定時間を待つと経過時間をもってresolveされる', () => {
      return wait(50).then((duration) => {
        expect(duration).toBe(50);
      });
    });
    test('指定時間を待つと経過時間をもってresolveされる2', () => {
      return expect(wait(50)).resolves.toBe(50);
    });
    test('指定時間を待つと経過時間をもってresolveされる3', async () => {
      await expect(wait(50)).resolves.toBe(50);
    });
    test('指定時間を待つと経過時間をもってresolveされる4', async () => {
      expect(await wait(50)).toBe(50);
    });
  });
  describe('timeout', () => {
    test('指定時間待つと、経過時間をもって reject される', () => {
      return timeout(50).catch((duration) => {
        expect(duration).toBe(50);
      });
    });
    test('指定時間待つと、経過時間をもって reject される2', () => {
      return expect(timeout(50)).rejects.toBe(50);
    });
    test('指定時間待つと、経過時間をもって reject される3', async () => {
      await expect(timeout(50)).rejects.toBe(50);
    });
    test('指定時間待つと、経過時間をもって reject される4', async () => {
      expect.assertions(1);
      try {
        await timeout(50);
      } catch (err) {
        expect(err).toBe(50);
      }
    });
  });
});

test('アサーションに到達しないままテスト終了して成功する', async () => {
  try {
    await wait(50); // timeout関数のつもりがwait関数にしてしまった
    // ここで終了してしまい、テストは成功する
  } catch (err) {
    // アサーションは実行されない
    expect(err).toBe(50);
  }
});

test('アサーションが1度も実行されないまま終了するのでテストは失敗する', async () => {
  expect.assertions(1); // アサーションが実行されることを検証する。引数は実行される回数の期待値。
  try {
    await wait(50); // timeout関数のつもりがwait関数にしてしまった
    // アサーションが1度も実行されないまま終了するのでテストは失敗する
  } catch (err) {
    // アサーションは実行されない
    expect(err).toBe(50);
  }
});

test('returnしていないためPromiseが解決する前にテストが終了してしまう', () => {
  // 失敗を期待して書かれたアサーション
  expect(wait(2000)).resolves.toBe(3000);
  // 正しくはアサーションをreturnする
  // return expect(wait(2000)).resolves.toBe(3000);
});