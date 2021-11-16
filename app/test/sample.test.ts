import { TestSuite, InputType } from '@jovotech/framework';

/*
|--------------------------------------------------------------------------
| UNIT TESTING
|--------------------------------------------------------------------------
|
| Run `npm test` to execute this sample test.
| Learn more here: v4.jovo.tech/docs/unit-testing
|
*/

const testSuite = new TestSuite();

test('should ask the user if they like pizza', async () => {

  const { output } = await testSuite.run({
    type: InputType.Launch, // or 'LAUNCH'
  });

  expect(output).toEqual([
    {
      message: 'Do you like pizza?',
      quickReplies: ['yes', 'no'],
      listen: true,
    },
  ]);

});
