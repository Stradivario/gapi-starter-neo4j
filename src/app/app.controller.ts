import { Controller, Type, Query, GraphQLInt, GraphQLString } from "@gapi/core";
import { AppType } from "./app.type";

@Controller()
export class AppQueriesController {

    @Type(AppType)
    @Query({
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
    appType() {}

}
 

