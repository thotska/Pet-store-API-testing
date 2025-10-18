import {test, expect} from '@playwright/test';
import z, { object, string, number } from 'zod';
import { faker } from '@faker-js/faker';
import { getAPI, deleteAPI, postAPI } from '../utils/apiCallHelper';


test.describe("Place, Find, and Delete Pet Order CRUD Operations", () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const petOrderSchema = object({
        id: number(),
        petId: number(),
        quantity: number(),
        shipDate: string(),
        status: string(),
        complete: z.boolean()
    });
    const deletePurchaseOrderByIdResponseSchema = z.object({
        code: z.number().int(),
        type: z.string(),
        message: z.string()
    });

    test('Place a new Pet Order', async ({ request }) => {
        await postAPI(request, 
            `${BASE_URL}/store/order`, 
            {
                id: faker.number.int(),
                petId: faker.number.int(),
                quantity: faker.number.int({ min: 1, max: 5 }),
                shipDate: new Date().toISOString(),
                status: "delivered",
                complete: true
            },
            200,
            petOrderSchema);
    }); 

    test('Find the Pet Order by ID', async ({ request }) => {
        const newOrderResponse = await postAPI(request, 
            `${BASE_URL}/store/order`, 
            {
                id: faker.number.int(),
                petId: faker.number.int(),
                quantity: faker.number.int({ min: 1, max: 5 }),
                shipDate: new Date().toISOString(),
                status: "delivered",
                complete: true
            },
            200,
            petOrderSchema);

        const newOrder = await newOrderResponse.json();
        const orderId = newOrder.id;

        await getAPI(request,
             `${BASE_URL}/store/order/${orderId}`,
              200, 
              petOrderSchema);
    });

    test('Delete the Pet Order by ID', async ({ request }) => {
        const newOrderResponse = await postAPI(request, 
            `${BASE_URL}/store/order`, 
            {   
                id: faker.number.int(),
                petId: faker.number.int(),
                quantity: faker.number.int({ min: 1, max: 5 }),
                shipDate: new Date().toISOString(),
                status: "delivered",
                complete: true
            },
            200,
            petOrderSchema);

        const newOrder = await newOrderResponse.json();
        const orderId = newOrder.id;

        await deleteAPI(request,
             `${BASE_URL}/store/order/${orderId}`, 
             200,
            deletePurchaseOrderByIdResponseSchema);
    })
});