import * as Fetchers from '.';
import { httpError, postMyAddressMock } from './fixtures';

export function mockPostMyAddress(status = 201) {
  if (status > 299) {
    return jest.spyOn(Fetchers, 'postMyAddress').mockRejectedValueOnce(httpError);
  }
  // 「フォームの入力値が正常にPOSTされたか」をテストする際に、APIのレスポンスとして postMyAddressMock が返ってくるようにモックされています。
  return jest.spyOn(Fetchers, 'postMyAddress').mockResolvedValueOnce(postMyAddressMock);
}
