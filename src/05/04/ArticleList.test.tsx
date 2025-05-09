import { render, screen } from '@testing-library/react';
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
})