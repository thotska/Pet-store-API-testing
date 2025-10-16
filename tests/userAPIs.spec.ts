import { test, expect, request } from '@playwright/test';
import z from 'zod';
import { faker } from '@faker-js/faker';
import { getAPI, postAPI, putAPI, deleteAPI} from '../utils/apiCallHelper';


test.describe('User API Tests', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`
    const createNewUserRequestBody = {
            "id": 12452,
            "username": "TestUserNameTetiana99",
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "phone": faker.phone.number(),
            "userStatus": 0
        };

        const createNewUserResponseSchema = z.object({
            code: z.literal(200),
            type: z.literal('unknown'),
            message: z.literal(createNewUserRequestBody.id.toString()),
        });
    test('Create a new User', async ({ request }) => {
        const createNewUserResponse = await request.post(`${BASE_URL}/user`, {
            data: createNewUserRequestBody
        });
        
        await postAPI(
            request,
            `${BASE_URL}/user`,
            createNewUserRequestBody,
            200,
            createNewUserResponseSchema);
    });

    test("Get user by username", async ({request}) => {
        const username = createNewUserRequestBody.username;
        
        await getAPI(
            request,
            `${BASE_URL}/user/${username}`,
            200,
            z.object({
                id: z.number().int(),
                username: z.literal(username),
                firstName: z.string(),
                lastName: z.string(),
                email: z.string().email(),
                password: z.string(),
                phone: z.string(),
                userStatus: z.number().int()
            })
        );
    });


    test("Update user by username", async ({request}) => {
        const username = createNewUserRequestBody.username;
        const updateUserRequestBody = {
            "id": 12452,
            "username": username,
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "phone": faker.phone.number(),
            "userStatus": 1
        };

        const updateUserResponseSchema = z.object({
            code: z.literal(200),
            type: z.literal('unknown'),
            message: z.literal(updateUserRequestBody.id.toString()),
        });

        await putAPI(
            request,
            `${BASE_URL}/user/${username}`,
            updateUserRequestBody,
            200,
            updateUserResponseSchema
        );
    });









            
    test("Delete user by username", async ({request}) => {
        const username = createNewUserRequestBody.username;

        await deleteAPI(
            request,
            `${BASE_URL}/user/${username}`,
            200,
            z.object({
                code: z.literal(200),
                type: z.literal('unknown'),
                message: z.literal(username),
            })
        );
    });
});


