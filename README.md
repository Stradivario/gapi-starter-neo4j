

# @Gapi Starter Neo4J Graph
![gapi-cli](https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_1536959323/neo4j.png)
#### To start developing clone repository

```bash
git clone https://github.com/Stradivario/gapi-starter-neo4j
```

#### Install @gapi command line interface and typescript node
```bash
npm i -g @gapi/cli ts-node
```

#### Download Neo4J database https://neo4j.com/download/

Follow the steps and create your Graph using interface provided and set password to it

default username for neo4j is `neo4j`

- Go to `src/app/app.module.ts` and find this line:
- Here we attach neo4j driver to context of our resolvers and passing basic authentication before the actual GraphQL request is born
- change `your-pass` with appropriate password

```typescript
        {
            provide: ON_REQUEST_HANDLER,
            useFactory: () => async (next, context, request: Request, h: ResponseToolkit, err: Error) => {
                context.driver = (neo4j.driver(
                    'bolt://localhost:7687',
                    neo4j.auth.basic('neo4j', 'your-pass')
                ))
                return next;
            }
        }
```
#### The same `context` object can be accessed also when initializing @rxdi/graphql module inside `framework-imports.ts` 
That way we will make single initializing onto neo4j driver instead of assigning it to the object on every request

```typescript
import { GraphQLModule } from "@rxdi/graphql";
import { Module } from "@rxdi/core";
import { HapiModule } from "@rxdi/hapi";
import { GraphQLModule } from "@rxdi/graphql";
import { v1 as neo4j } from 'neo4j-driver';

@Module({
    imports: [
        HapiModule.forRoot({
            hapi: {
                port: 9000
            }
        }),
        GraphQLModule.forRoot({
            graphqlOptions: {
                context: {
                    driver: (neo4j.driver(
                        'bolt://localhost:7687',
                        neo4j.auth.basic('neo4j', 'your-graph-password')
                    ))
                },
                schema: null
            }
        }),
    ]
})
export class CoreModule {}
```


#### Start the application
```bash
gapi start
```

You are ready to write queries :)

Open browser to

http://0.0.0.0:9000/graphiql?operationName=AppType&query=query%20AppType%20%7B%0A%20%20AppType(first%3A%2010)%20%7B%0A%20%20%20%20id%0A%20%20%20%20email%0A%20%20%20%20name%0A%20%20%20%20_id%0A%20%20%7D%0A%7D%0A%0Amutation%20CreateAppType%7B%0A%20%20CreateAppType(id%3A1%2C%20email%3A%22test%22%2C%20name%3A%22pesho%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20email%0A%20%20%20%20name%0A%20%20%20%20_id%0A%20%20%7D%0A%7D%0A%0Amutation%20UpdateAppType%20%7B%0A%20%20UpdateAppType(id%3A%201%2C%20email%3A%22%22%2C%20name%3A%22%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20email%0A%20%20%20%20name%0A%20%20%20%20_id%0A%20%20%7D%0A%7D%0A%0Amutation%20DeleteAppType%20%7B%0A%20%20DeleteAppType(id%3A%202)%20%7B%0A%20%20%20%20id%0A%20%20%20%20email%0A%20%20%20%20name%0A%20%20%20%20_id%0A%20%20%7D%0A%7D



```graphql
query AppType {
  AppType(first: 10) {
    id
    email
    name
    _id
  }
}

mutation CreateAppType{
  CreateAppType(id:1, email:"test", name:"pesho") {
    id
    email
    name
    _id
  }
}

mutation UpdateAppType {
  UpdateAppType(id: 1, email:"", name:"") {
    id
    email
    name
    _id
  }
}

mutation DeleteAppType {
  DeleteAppType(id: 2) {
    id
    email
    name
    _id
  }
}
```


#### Explanation

##### Neo4J Driver load
```typescript
import { Module, ON_REQUEST_HANDLER, SCHEMA_OVERRIDE, printSchema, GraphQLSchema  } from "@gapi/core";
import { AppQueriesController } from "./app.controller";
import { Request, ResponseToolkit } from 'hapi';
import * as neo4jgql from 'neo4j-graphql-js';
import { v1 as neo4j } from 'neo4j-driver';

@Module({
    controllers: [AppQueriesController],
    providers: [
        {
            provide: SCHEMA_OVERRIDE,
            useFactory: () => (schema: GraphQLSchema) => {
                // Do things with bootstrapped schema
                // For example now we augment schema so we can have neo4j-graphql CRUD operations based on Type
                return neo4jgql.makeAugmentedSchema({ typeDefs: printSchema(schema) });
            }
        },
        {
            provide: ON_REQUEST_HANDLER,
            useFactory: () => async (next, context, request: Request, h: ResponseToolkit, err: Error) => {
                // Authenticate user here if it is not authenticated return Boom.unauthorized()
                // if (request.headers.authorization) {
                //     const tokenData = ValidateToken(request.headers.authorization);
                //     const user = {};
                //     if (!user) {
                //         return Boom.unauthorized();
                //     } else {
                //         context.user = {id: 1, name: 'pesho'};
                //     }
                // }
                // context.user - modifying here context will be passed to the resolver
                // Passing Neo4J driver for every resolver context
                context.driver = (neo4j.driver(
                    'bolt://localhost:7687',
                    neo4j.auth.basic('neo4j', 'your-pass')
                ))
                return next();
            }
        }
    ]
})
export class AppModule { }
```

