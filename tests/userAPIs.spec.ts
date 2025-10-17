import { test, expect, request } from '@playwright/test';
import z from 'zod';
import { faker } from '@faker-js/faker';
import { getAPI, postAPI, putAPI, deleteAPI } from '../utils/apiCallHelper';


test.describe("end to end test - Create, Get, Update, Delete user", () => {
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

    const getExpectedGetUserResponseSchema = z.object({
        id: z.number().int(),
        username: z.literal(createNewUserRequestBody.username),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string(),
        userStatus: z.number().int()
    });

    const updateUserRequestBody = {
        "id": 12452,
        "username": createNewUserRequestBody.username,
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "phone": faker.phone.number(),
        "userStatus": 1
    };

    test('Create, Get, Update, Delete user', async ({ request }) => {
        await postAPI(
            request,
            `${BASE_URL}/user`,
            createNewUserRequestBody,
            200,
            createNewUserResponseSchema);

        await getAPI(
            request,
            `${BASE_URL}/user/${createNewUserRequestBody.username}`,
            200,
            getExpectedGetUserResponseSchema
        );

        await putAPI(
            request,
            `${BASE_URL}/user/${createNewUserRequestBody.username}`,
            updateUserRequestBody,
            200,
            createNewUserResponseSchema
        );
        await deleteAPI(
            request,
            `${BASE_URL}/user/${createNewUserRequestBody.username}`,
            200,
            createNewUserResponseSchema
        );
    });
});
