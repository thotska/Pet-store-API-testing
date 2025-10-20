import {test, expect} from '@playwright/test';
import z, { object, string, number } from 'zod';
import { faker } from '@faker-js/faker';
import { getAPI, deleteAPI, postAPI } from '../utils/apiCallHelper';


test.describe("Place, Find, and Delete Pet Order CRUD Operations", () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const petOrderSchema = object({
        id: z.number(),
        petId: z.number(),
        quantity: z.number(),
        shipDate: z.string(),
        status: z.string(),
        complete: z.boolean()
    });
    const deletePurchaseOrderByIdResponseSchema = z.object({
        code: z.number().int(),
        type: z.string(),
        message: z.string()
    });

    const orderRequestBody = {
        id: faker.number.int(),
        petId: faker.number.int(),
        quantity: faker.number.int({ min: 1, max: 5 }),
        shipDate: new Date().toISOString(),
        status: "delivered",
        complete: true
    };

    test('CRUD: Create, Read, and Delete Pet Order', async ({ request }) => {
        const newOrderResponse = await postAPI(request, 
            `${BASE_URL}/store/order`, 
            orderRequestBody,
            200,
            petOrderSchema);

        const newOrder = await newOrderResponse.json();
        const orderId = newOrder.id;

        await getAPI(request,
             `${BASE_URL}/store/order/${orderId}`,
              200, 
              petOrderSchema);

        await deleteAPI(request,
             `${BASE_URL}/store/order/${orderId}`, 
             200,
            deletePurchaseOrderByIdResponseSchema);
    });
});