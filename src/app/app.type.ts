import { GraphQLInt, GraphQLObjectType, GraphQLString} from "@gapi/core";

export const AppType = new GraphQLObjectType( {
    name: 'AppType',
    fields: () => ({
        id:  {
            type: GraphQLInt
        },
        email: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }
    })
});