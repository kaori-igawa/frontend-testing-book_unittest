import { greet, sayGoodBye } from './greet';

// 対象モジュールの置き換え準備が実施される
jest.mock('./greet', () => ({
  sayGoodBye: (name: string) => `Good bye, ${name}.`,  // sayGoodByeを置き換え
}));

test('挨拶が未実装（本来の実装ではない）', () => {
  expect(greet).toBe(undefined);
});

test('さよならを返す（本来の実装ではない）', () => {
  const message = `${sayGoodBye('Taro')} See you.`;
  expect(message).toBe('Good bye, Taro. See you.');
});