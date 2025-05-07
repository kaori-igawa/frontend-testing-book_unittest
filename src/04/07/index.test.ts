import { greetByTime } from '.';

describe('greetByTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test('朝は「おはよう」を返す', () => {
    jest.setSystemTime(new Date(2023, 4, 23, 8, 0, 0));
    expect(greetByTime()).toBe('おはよう');
  });

  test('昼は「こんにちは」と返す', () => {
    jest.setSystemTime(new Date(2023, 4, 23, 14, 0, 0));
    expect(greetByTime()).toBe('こんにちは');
  });

  test('夜は「こんばんは」と返す', () => {
    jest.setSystemTime(new Date(2023, 4, 23, 21, 0, 0));
    expect(greetByTime()).toBe('こんばんは');
  });
});

describe('セットアップ処理の実行タイミング', () => {
  beforeAll(() => console.log('1 - beforeAll'));
  afterAll(() => console.log('1 - afterAll'));
  beforeEach(() => console.log('1 - beforeEach'));
  afterEach(() => console.log('1 - afterEach'));

  test('', () => console.log('1 - test'));

  describe('Scoped / Nested block', () => {
    beforeAll(() => console.log('2 - beforeAll'));
    afterAll(() => console.log('2 - afterAll'));
    beforeEach(() => console.log('2 - beforeEach'));
    afterEach(() => console.log('2 - afterEach'));

    test('', () => console.log('2 - test'));
  });
});

/**
 * 実行順番
 */

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll