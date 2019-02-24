import { GraphQLInt, GraphQLObjectType, GraphQLString} from "@gapi/core";
import { v1 as neo4j } from 'neo4j-driver';

export const AppTypeQueryParams = {
    id: {
        type: GraphQLInt
    },
    email: {
        type: GraphQLString
    },
    name: {
        type: GraphQLString
    }
};

export const AppType = new GraphQLObjectType( {
    name: 'AppType',
    fields: () => (AppTypeQueryParams)
});



export interface GraphQLContext { driver: neo4j.Driver }

export interface AppTypeQueryParams { id: number; name: string; email: string };