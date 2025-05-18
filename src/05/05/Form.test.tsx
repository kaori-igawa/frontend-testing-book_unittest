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

test('主要エリアが表示されている', () => {
  render(<Form />);
  expect(screen.getByRole('heading', { name: '新規アカウント登録'})).toBeInTheDocument();
  expect(screen.getByRole('group', { name: 'アカウント情報の入力'})).toBeInTheDocument();
  expect(screen.getByRole('group', { name: '利用規約の同意'})).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'サインアップ' })).toBeInTheDocument();
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

test('Snapshot: 新規アカウント登録フォームが表示される', () => {
const { container } = render(<Form />);
expect(container).toMatchSnapshot();
});