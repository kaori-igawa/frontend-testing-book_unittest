import { render, screen } from "@testing-library/react";
import { Agreement } from "./Agreement";


test('fieldsetのアクセシブルネームは、legendを引用している', () => {
  render(<Agreement />);
  // fieldset要素の暗黙のロールはgroup
  // legend要素はfieldset要素のタイトル
  expect(screen.getByRole('group', {name: '利用規約の同意'})).toBeInTheDocument();
});

test('チェックボックスはチェックが入っていない', () => {
  render(<Agreement />);
  // toBeChecked ⇛ チェックされているか検証するカスタムマッチャー
  expect(screen.getByRole('checkbox')).not.toBeChecked();
});