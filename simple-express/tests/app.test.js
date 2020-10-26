import {mimicAPI  } from "../route";

test('the data is peanut butter', async () => {
 let data = await mimicAPI();
    expect(data).toBe('hello');
 
});