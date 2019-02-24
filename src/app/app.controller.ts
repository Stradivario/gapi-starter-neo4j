import { Controller, Type, Query, Interceptor, Injectable, InterceptResolver, GraphQLList, GenericGapiResolversType } from "@gapi/core";
import { AppType, AppTypeQueryParams, GraphQLContext } from "./app.type";
import { tap } from 'rxjs/operators';
import { neo4jgraphql } from 'neo4j-graphql-js';
import { Observable } from "rxjs/internal/Observable";
import { IAppType } from "./core/api-introspection";

@Injectable()
export class AppInterceptor implements InterceptResolver {
    intercept(
        $chainable: Observable<any>,
        context: GraphQLContext,
        payload: AppTypeQueryParams,
        descriptor: GenericGapiResolversType
    ) {
        console.log('Before...');
        const now = Date.now();
        return $chainable.pipe(
          tap((res) => {
              console.log(res);
              console.log(`After... ${Date.now() - now}ms`);
          }),
        );
    }
}

@Controller()
export class AppQueriesController {

    @Type(new GraphQLList(AppType))
    @Interceptor(AppInterceptor)
    @Query(AppTypeQueryParams)
    AppType(root: IAppType, params, ctx: GraphQLContext, resolveInfo) {
        return neo4jgraphql(root, params, ctx, resolveInfo);
    }

    @Type(AppType)
    @Interceptor(AppInterceptor)
    @Query(AppTypeQueryParams)
    findAppType(root: IAppType, params, ctx: GraphQLContext, resolveInfo) {
        return neo4jgraphql(root, params, ctx, resolveInfo);
    }

}


