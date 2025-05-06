import { greet, sayGoodBye } from './greet';

// 対象モジュールの置き換え準備が実施される
jest.mock('./greet', () => ({
  ...jest.requireActual('./greet'),  // モジュール本来の実装をimport
  sayGoodBye: (name: string) => `Good bye, ${name}.`, // sayGoodByeのみ置き換え
}));

test('挨拶を返す（本来の実装どおり）', () => {
  expect(greet('Taro')).toBe('Hello! Taro.');
});

test('さよならを返す（本来の実装ではない）', () => {
  const message = `${sayGoodBye('Taro')} See you.`;
  expect(message).toBe('Good bye, Taro. See you.');
});