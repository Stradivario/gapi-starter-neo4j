// tslint:disable
// graphql typescript definitions


  export interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  export interface IGraphQLResponseError {
    message: string;            // Required for all errors
    locations?: Array<IGraphQLResponseErrorLocation>;
    [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
  }

  export interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  /**
    description: Query type for all get requests which will not change persistent data
  */
  export interface IQuery {
    __typename?: "Query";
    AppType: Array<IAppType> | null;
    findAppType: IAppType | null;
}

export   
  type IAppTypeOrderingEnum = 'id_asc' | 'id_desc' | 'email_asc' | 'email_desc' | 'name_asc' | 'name_desc' | '_id_asc' | '_id_desc';

  
  export interface IAppType {
    __typename?: "AppType";
    id: number | null;
    email: string | null;
    name: string | null;
    _id: string | null;
}

  
  export interface IMutation {
    __typename?: "Mutation";
    CreateAppType: IAppType | null;
    UpdateAppType: IAppType | null;
    DeleteAppType: IAppType | null;
}

  
  export interface INeo4jTime {
    __typename?: "_Neo4jTime";
    hour: number | null;
    minute: number | null;
    second: number | null;
    millisecond: number | null;
    microsecond: number | null;
    nanosecond: number | null;
    timezone: string | null;
    formatted: string | null;
}

  
  export interface INeo4jTimeInput {
    hour?: number | null;
    minute?: number | null;
    second?: number | null;
    nanosecond?: number | null;
    millisecond?: number | null;
    microsecond?: number | null;
    timezone?: string | null;
    formatted?: string | null;
}

  
  export interface INeo4jDate {
    __typename?: "_Neo4jDate";
    year: number | null;
    month: number | null;
    day: number | null;
    formatted: string | null;
}

  
  export interface INeo4jDateInput {
    year?: number | null;
    month?: number | null;
    day?: number | null;
    formatted?: string | null;
}

  
  export interface INeo4jDateTime {
    __typename?: "_Neo4jDateTime";
    year: number | null;
    month: number | null;
    day: number | null;
    hour: number | null;
    minute: number | null;
    second: number | null;
    millisecond: number | null;
    microsecond: number | null;
    nanosecond: number | null;
    timezone: string | null;
    formatted: string | null;
}

  
  export interface INeo4jDateTimeInput {
    year?: number | null;
    month?: number | null;
    day?: number | null;
    hour?: number | null;
    minute?: number | null;
    second?: number | null;
    millisecond?: number | null;
    microsecond?: number | null;
    nanosecond?: number | null;
    timezone?: string | null;
    formatted?: string | null;
}

  
  export interface INeo4jLocalTime {
    __typename?: "_Neo4jLocalTime";
    hour: number | null;
    minute: number | null;
    second: number | null;
    millisecond: number | null;
    microsecond: number | null;
    nanosecond: number | null;
    formatted: string | null;
}

  
  export interface INeo4jLocalTimeInput {
    hour?: number | null;
    minute?: number | null;
    second?: number | null;
    millisecond?: number | null;
    microsecond?: number | null;
    nanosecond?: number | null;
    formatted?: string | null;
}

  
  export interface INeo4jLocalDateTime {
    __typename?: "_Neo4jLocalDateTime";
    year: number | null;
    month: number | null;
    day: number | null;
    hour: number | null;
    minute: number | null;
    second: number | null;
    millisecond: number | null;
    microsecond: number | null;
    nanosecond: number | null;
    formatted: string | null;
}

  
  export interface INeo4jLocalDateTimeInput {
    year?: number | null;
    month?: number | null;
    day?: number | null;
    hour?: number | null;
    minute?: number | null;
    second?: number | null;
    millisecond?: number | null;
    microsecond?: number | null;
    nanosecond?: number | null;
    formatted?: string | null;
}

  
  export interface IAppTypeInput {
    id: number;
}

export   
  type IRelationDirectionsEnum = 'IN' | 'OUT';


// tslint:enable
