import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputAccount } from './InputAccount';

// userインスタンスを作成。
const user = userEvent.setup();

test('fieldsetのアクセシブルネームは、legendを引用している', () => {
  render(<InputAccount />);
  expect(screen.getByRole('group', {name: 'アカウント情報の入力'})).toBeInTheDocument();
});

test('メールアドレス入力欄', async () => {
  render(<InputAccount />);
  // <input type='text />はtextboxの暗黙のロールを持っている
  const textbox = screen.getByRole('textbox', {name: 'メールアドレス'});
  const value = 'taro.tanaka@example.com';
  // textboxにvalueを入力
  await user.type(textbox, value);
  // 期待値が入力されている、フォーム構成要素が存在するかを検証
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test('パスワード入力欄', async () => {
  render(<InputAccount />);
  // <input type='password' />はロールを持たないので以下だとエラーが発生してテストは失敗する。
  // HTML要素とロールはイコールではない。
  // const textbox = screen.getByRole('textbox', {name: 'パスワード'});
  // expect(textbox).toBeInTheDocument();

  expect(() => screen.getByRole('textbox', { name: 'パスワード'})).toThrow();
  expect(() => screen.getByPlaceholderText('8文字以上で入力')).not.toThrow();
});

test('パスワード入力テスト', async () => {
  render(<InputAccount />);
  const password = screen.getByPlaceholderText('8文字以上で入力');
  const value = 'abcd1234';
  await user.type(password, value);
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});