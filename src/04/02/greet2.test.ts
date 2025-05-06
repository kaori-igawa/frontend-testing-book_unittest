import { greet } from './greet';

// 対象モジュールの置き換え準備が実施される
jest.mock('./greet');

test('挨拶を返さない（本来の実装ではない）', () => {
  // undefinedが返ってくる
  // expect(greet('Taro')).toBe('Hello! Taro.');
  expect(greet('Taro')).toBe(undefined);
});