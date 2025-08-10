# Testing Setup

This project uses Jest for unit testing.

## Running Tests

- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode (re-runs tests when files change)
- `npm run test:coverage` - Run tests with coverage report

## Test Files

Test files are located in the `tests/` directory and follow the naming convention `*.test.js`.

## Current Test Coverage

The test suite currently covers:
- `routeHelper.js` - Tests for route summary and leg summary functions
- `weatherHelper.js` - Tests for weather data processing functions

## Adding New Tests

1. Create a new test file in the `tests/` directory with the `.test.js` extension
2. Import the functions you want to test using `require()`
3. Write test cases using Jest's `describe()` and `test()` functions
4. Use Jest matchers like `expect().toBe()`, `expect().toEqual()`, etc.

## Jest Configuration

Jest is configured via `jest.config.js` with:
- Node.js test environment
- Coverage reporting enabled
- Test file pattern matching `**/*.test.js` and `**/*.spec.js`
