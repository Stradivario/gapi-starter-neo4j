import { Module, CoreModule } from "@gapi/core";
import { v1 as neo4j } from 'neo4j-driver';
import * as neo4jgql from 'neo4j-graphql-js';

@Module({
    providers: [{
        provide: 'neo4j-graphql-js',
        useValue: neo4jgql
    }],
    imports: [
        CoreModule.forRoot({
            server: {
                hapi: {
                    port: process.env.API_PORT || process.env.PORT || 9000,
                    routes: {
                        cors: {
                            origin: ['*'],
                            additionalHeaders: [
                                'Host',
                                'User-Agent',
                                'Accept',
                                'Accept-Language',
                                'Accept-Encoding',
                                'Access-Control-Request-Method',
                                'Access-Control-Allow-Origin',
                                'Access-Control-Request-Headers',
                                'Origin',
                                'Connection',
                                'Pragma',
                                'Cache-Control'
                            ]
                        }
                    }

                }
            },
            graphql: {
                path: '/graphql',
                graphiQlPath: '/graphiql',
                openBrowser: true,
                watcherPort: 8967,
                writeEffects: true,
                graphiql: true,
                graphiQlPlayground: false,
                graphiqlOptions: {
                    endpointURL: '/graphql',
                    passHeader: `'Authorization':'${process.env.GRAPHIQL_TOKEN}'`,
                    subscriptionsEndpoint: `${process.env.GRAPHIQL_WS_SSH ? 'wss' : 'ws'}://${process.env.GRAPHIQL_WS_PATH || 'localhost'}${process.env.DEPLOY_PLATFORM === 'heroku'
                        ? ''
                        : `:${process.env.API_PORT ||
                        process.env.PORT}`}/subscriptions`,
                    websocketConnectionParams: {
                        token: process.env.GRAPHIQL_TOKEN
                    }
                },
                graphqlOptions: {
                    context: {
                        driver: (neo4j.driver(
                            'bolt://localhost:7687',
                            neo4j.auth.basic('neo4j', '98412218')
                        ))
                    },
                    schema: null
                }
            },
        })
    ]
})
export class FrameworkImports { }