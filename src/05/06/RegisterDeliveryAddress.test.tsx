import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { RegisterDeliveryAddress } from "./RegisterDeliveryAddress";

const user = userEvent.setup();

describe('新しいお届け先を登録しますか？', () => {
  test('ラジオボタンをクリックすると、コールバックハンドラが呼ばれる', async() => {
    const fn = jest.fn();
    render(<RegisterDeliveryAddress onChange={fn} />);
    // fireEvent.click(screen.getByLabelText('いいえ'));
    await user.click(screen.getByLabelText('いいえ'));
    expect(fn).toHaveBeenCalledWith(false);
    // fireEvent.click(screen.getByLabelText('はい'));
    await user.click(screen.getByLabelText('はい'));
    expect(fn).toHaveBeenCalledWith(true);
  });
});