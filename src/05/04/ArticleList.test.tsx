import { render, screen, within } from '@testing-library/react';
import { ArticleList } from './ArticleList';
import { items } from './fixture';

test('itemsの数だけ一覧表示される', () => {
  render(<ArticleList items={items} />);
  // li要素は暗黙のロールとしてlistitemをもつ
  // screen.getAllByRole ⇛ 該当要素を配列で取得する
  // toHaveLength ⇛ 配列の要素数を検証するマッチャー
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

test('一覧が表示される', () => {
  render(<ArticleList items={items} />);
  const list = screen.getByRole('list');
  expect(list).toBeInTheDocument();
});

test('一覧が表示されて、itemsの数だけ一覧表示される', () => {
  render(<ArticleList items={items} />);
  const list = screen.getByRole('list');
  expect(list).toBeInTheDocument();
  // within ⇛ 指定のノードに含まれている要素を検証できる
  expect(within(list).getAllByRole('listitem')).toHaveLength(3);
});

test('一覧アイテムが空のとき「投稿記事がありません」が表示される', () => {
  // 空配列を与えて、一覧表示がない状態を再現する
  render(<ArticleList items={[]} />)
  // 存在しないと予測される要素の取得を試みる
  // queryByRole ⇛ queryBy接頭辞のAPIはエラー発生でテストが中断しない
  const list = screen.queryByRole('list');
  // listが存在しないか検証
  expect(list).not.toBeInTheDocument();
  // listがnullであることを検証する
  // expect(list).toBeNull();
  // 「投稿記事がありません」が表示されていることを確認
  expect(screen.getByText('投稿記事がありません')).toBeInTheDocument();
});

test('Snapshot: itemsの数だけ一覧表示される', () => {
  const { container } = render(<ArticleList items={items} />);
  expect(container).toMatchSnapshot();
});

