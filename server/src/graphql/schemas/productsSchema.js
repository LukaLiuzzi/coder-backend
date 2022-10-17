import { buildSchema } from 'graphql';

const productSchema = buildSchema(`
    input ProductInput {
        name: String,
        price: Int,
    }
    type Product {
        id: ID!,
        name: String,
        price: Int,
    }
    type Query {
        getProduct(id: ID!): Product,
        getProducts(field: String, value: String): [Product],
    }
    type Mutation {
        createProduct(data: ProductInput): Product,
        updateProduct(id: ID!, data: ProductInput): Product,
        deleteProduct(id: ID!): Product,
    }
`);

export { productSchema };
