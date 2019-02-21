

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

- Go to `src/app/framework-imports.ts` and find this line:
- Here we attach neo4j driver to context of our resolvers and passing basic authentication
- change `your-pass` with appropriate password

```typescript
    context: {
        driver: (neo4j.driver(
            'bolt://localhost:7687',
            neo4j.auth.basic('neo4j', 'your-pass')
        ))
    },
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



##### Neo4J Driver load
```typescript
import { Module } from "@rxdi/core";
import { HapiModule } from "@rxdi/hapi";
import { GraphQLModule } from "@rxdi/graphql";
import { v1 as neo4j } from 'neo4j-driver';
import * as neo4jgql from 'neo4j-graphql-js';

@Module({
    providers: [{
        provide: 'neo4j-graphql-js',
        useValue: neo4jgql
    }],
    imports: [
        HapiModule.forRoot({
            hapi: {
                port: 9000
            }
        }),
        GraphQLModule.forRoot({
            path: '/graphql',
            openBrowser: false,
            writeEffects: false,
            graphiQlPath: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql',
                subscriptionsEndpoint: `${
                    process.env.GRAPHIQL_WS_SSH ? 'wss' : 'ws'
                    }://${process.env.GRAPHIQL_WS_PATH || 'localhost'}${
                    process.env.DEPLOY_PLATFORM === 'heroku'
                        ? ''
                        : `:${process.env.API_PORT ||
                        process.env.PORT}`
                    }/subscriptions`,
                websocketConnectionParams: {
                    token: process.env.GRAPHIQL_TOKEN
                }
            },
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
export class FrameworkImports {}
```

#### Here we inject neo4j-graphql-js library to dependency injection so graphql server will handle it and work with the library

```typescript
    providers: [{
        provide: 'neo4j-graphql-js',
        useValue: neo4jgql
    }],
```

