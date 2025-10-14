# Pet Store API Testing

A comprehensive API testing framework using Playwright, TypeScript, Zod for schema validation, and Faker for test data generation.

## 🚀 Features

- **Playwright** for robust API testing
- **TypeScript** for type safety
- **Zod** for runtime schema validation
- **Faker** for dynamic test data generation
- **dotenv** for environment configuration
- HTML and JSON test reports

## 📁 Project Structure

```
Pet-store-API-testing/
├── tests/
│   └── example.spec.ts          # API test examples
├── schemas/
│   └── example.schema.ts        # Zod schemas for validation
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies and scripts
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   copy .env.example .env
   ```
   
3. **Install Playwright:**
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug

# Show test report
npm run report
```

## 📝 Writing Tests

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { PetSchema } from '../schemas/example.schema';

test('API test example', async ({ request }) => {
  const response = await request.get('/endpoint');
  
  expect(response.ok()).toBeTruthy();
  
  const data = await response.json();
  const validated = PetSchema.parse(data);
  
  expect(validated).toBeDefined();
});
```

### Schema Validation

All schemas are defined in the `schemas/` directory using Zod:

```typescript
import { z } from 'zod';

export const PetSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(['available', 'pending', 'sold']),
});
```

### Test Data Generation

Use Faker to generate dynamic test data:

```typescript
import { faker } from '@faker-js/faker';

const testData = {
  name: faker.animal.dog(),
  email: faker.internet.email(),
  id: faker.number.int({ min: 1, max: 1000 }),
};
```

## 📊 Reports

After running tests, view the HTML report:

```bash
npm run report
```

Reports are generated in the `playwright-report/` directory.

## 🔧 Configuration

- **Base URL**: Configure in `.env` file or `playwright.config.ts`
- **Timeouts**: Adjust in `playwright.config.ts`
- **Reporters**: Customize in `playwright.config.ts`

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Zod Documentation](https://zod.dev/)
- [Faker Documentation](https://fakerjs.dev/)
- [Pet Store API](https://petstore.swagger.io/)

## 📄 License

ISC
