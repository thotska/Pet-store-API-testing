import { z } from 'zod';

 export const gelAllProductsResponseSchema = z.object({
    responseCode: z.literal(200),
    products: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.string(),
        brand: z.string(),
        category: z.object({
            usertype: z.object({
                usertype: z.string()
            }),
            category: z.string()
        })
    }))
});