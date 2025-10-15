import {test, expect} from '@playwright/test';
import z from 'zod';
import {faker} from '@faker-js/faker';


test("Get user by username", async ({request}) => {
    const baseURL = "https://petstore.swagger.io/v2";
    const username = "TestUserNameTetiana99";

    const getUserByUsernameResponse = await request.get(`${baseURL}/user/${username}`);
    expect(getUserByUsernameResponse.status()).toBe(200);
    const getUserByUsernameResponseBody = await getUserByUsernameResponse.json();
    const getUserByUsernameResponseSchema = z.object({
        id: z.number().int(),
        username: z.literal(username),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string(),
        userStatus: z.number().int()
    });

    getUserByUsernameResponseSchema.parse(getUserByUsernameResponseBody);
});