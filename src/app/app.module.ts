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
                context.driver = neo4j.driver(
                    'bolt://localhost:7687',
                    neo4j.auth.basic('neo4j', '98412218')
                );
                return next();
            }
        }
    ]
})
export class AppModule { }