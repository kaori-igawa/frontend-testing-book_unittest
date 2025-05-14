import { fireEvent, render, screen } from '@testing-library/react';
import { Form } from './Form';

test('名前の表示', () => {
  render(<Form name='taro' />);
  // screen.getByText() ⇛ 一致した文字列を持つテキスト要素を1つ見つける
  // console.log(screen.getByText('taro'));

  // toBeInTheDocument() ⇛ 要素がドキュメントに存在することを検証するcustomマッチャー
  expect(screen.getByText('taro')).toBeInTheDocument();
});

test('ボタンの表示', () => {
  render(<Form name='taro' />);
  // screen.getByRole() ⇛ 特定のDOM要素をロールで取得する。ロールとはWebアクセシビリティに欠かせない情報。
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('見出しの表示', () => {
  render(<Form name='taro' />);
  // h1〜h6は暗黙的なロールとしてheadingロールを持つ
  // console.log(screen.getByRole('heading'));

  // toHaveTextContent() ⇛ 期待するテキストが含まれているかを検証するマッチャー
  expect(screen.getByRole('heading')).toHaveTextContent('アカウント情報');
});

test('ボタンを押下するとイベントハンドラーが実行される', () => {
  const mockFn = jest.fn();
  // mockFnをpropsでonSubmitに渡す。
  render(<Form name='taro' onSubmit={mockFn} />);
  // fireEvent.clickでボタンクリックを再現する
  fireEvent.click(screen.getByRole('button'));
  expect(mockFn).toHaveBeenCalled();
});

test('Snapshot: アカウント名「taro」が表示される', () => {
  const { container } = render(<Form name='jiro' />);
  expect(container).toMatchSnapshot();
});