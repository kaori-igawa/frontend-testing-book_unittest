import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';

const user = userEvent.setup();

test('formのアクセシブルネームは見出しを引用している', () => {
  render(<Form />);
  // formのaria-labelledby属性にh2のid属性と同じものを指定することで、h2の文字列をアクセシブルネームとして引用できる。
  // アクセシブルネームがないform属性はformロールが適用されないので注意。
  expect(screen.getByRole('form', { name: '新規アカウント登録'})).toBeInTheDocument();
});

test('サインアップボタンは非活性', () => {
  render(<Form />);
  expect(screen.getByRole('button', { name: 'サインアップ'})).toBeDisabled();
});

test('「利用規約の同意」チェックボックスを押下すると「サインアップ」ボタンは活性化', async () => {
  render(<Form />);
  await user.click(screen.getByRole('checkbox'));
  expect(screen.getByRole('button', { name: 'サインアップ'})).toBeEnabled();
});