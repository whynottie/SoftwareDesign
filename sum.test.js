const sum = require('./testCasesFuelQuoteForm');
const sub = require('./testCasesProfileManagement');
const div = require('./testCasesLogin');
const multi = require('./testCasesHistory');

test('empty / no input for gallon requested', () => {
  expect(sum()).toBe(NaN);
});

test('normal input-1', () => {
  expect(sum(1, 2)).toBe(3);
});

test('normal input-2', () => {
  expect(sum(-1, 2)).toBe(1);
});

test('invaild input', () => {
  expect(sum('A', 'B')).toBe(3);
});

test('numeric inputs for all requried inputs', () => {
  expect(sub(-1, -2)).toBe(1);
});

test('alphabetic inputs for all input', () => {
  expect(sub('A', 'B')).toBe(1);
});

test('numeric inputs for all input', () => {
  expect(sub(2, 1)).toBe(1);
});

test('no input', () => {
  expect(div()).toBe(NaN);
});

test('username and password are both numeric values', () => {
  expect(div(12, 3)).toBe(4);
});

test('username and password are both alphabetical values', () => {
  expect(div('A', 'B')).toBe(2);
});

test('username is a numeric value and password is alphabetical value', () => {
  expect(div('A', 1)).toBe(2);
});

test('username is a alphabetical value and password is numerical value', () => {
  expect(div(2, 'B')).toBe(2);
});

test('username and password are null', () => {
  expect(div()).toBe(NaN);
});

test('client fuel data put into history log - input 1', () => {
  expect(multi(2, 'A')).toBe(4);
});

test('client fuel data put into history log - input 2', () => {
  expect(multi('A', 'B')).toBe(2);
});

test('client fuel data put into history log - input 3', () => {
  expect(multi('A', 2)).toBe(4);
});

test('no input data from client fuel put into history log', () => {
  expect(multi()).toBe(NaN);
});
