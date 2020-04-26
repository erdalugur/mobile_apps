

export type ActionType = "select" | "update" | "delete" | "create";

export type SqlLogicalOperators = "AND" | "and" | "OR" | "or" | "NOT" | "not" | "AND NOT" | "OR NOT"

export interface ISelect {
    action?: "select" | "schema",
    model: string,
    fields?: string[],
    limit?: number | undefined,
    filters?: IFilter[],
    sortby?: ISort,
    joins?: IJoin[],
    paging?: Paging
    groupby?: string
}
export interface Paging {
    pageIndex: number,
    itemsPerPage: number,
    sortby?: ISort
}
export interface IAppRequest {
    model: string,
    action: ActionType,
}

export interface IFilter extends KeyValuePair<SqlOperators, SqlLogicalOperators> {
    model?: string
    operator: SqlOperators,
    rightOperator?: SqlLogicalOperators
}
export interface ISort extends KeyValuePair<string, SortTypes> {
    model: string
}
export interface KeyValuePair<key, value> {
    key: key | string,
    value: value | string,
}

export interface IJoin {
    model: string,
    fields: string[],
    primaryKey: string,
    parentKey: string,
    type?: "LEFT" | "RIGTH" | "INNER" | undefined
}
export interface IResponse {
    data?: any[],
    error?: any,
    statusCode: number,
    rowsEffected?: number[],
    token?: string
}


export interface IScript {
    action: "script",
    script: string
}

export interface IRequest {
    endpoint?: string,
    params: ISelect | IUpdate | IDelete | ICreate | IScript | IMultiCreate | {}
}

export interface IUpdate {
    action?: "update"
    model: string,
    row: IRow[],
    filters?: IFilter[]
}

export interface IDelete {
    action?: "delete",
    filters: IFilter[],
    model: string

}

export interface ICreate {
    action?: "create",
    model: string,
    row?: IRow[],
    afterSelect?: string[]
}

export interface IMultiCreate {
    action?: "multipleCreate",
    model: string,
    rows: string[][],
    keys: string[]
}
export interface IRows {
    keys: string[],
    values: any[]
}
export interface IRow extends IKeyValuePair<string, string> { }

export interface IKeyValuePair<key, value> {
    key: key | string,
    value: value | any
}

export interface IProc {
    action?: "procedure",
    model: string,
    parameters?: IKeyValuePair<string, string>[]
}

export interface ILogin {
    action?: "login",
    model: string,
    keyField: IKeyValuePair<string, string>,
    valueField: IKeyValuePair<string, string>
    fields?: string[],
    joins?: IJoin[],
    filters?: IFilter[]
    relaxMode?: boolean
}


export interface IMultiUpdate {
    action?: string,
    model: string,
    filters: string[],
    keyField: string,
    value: any,
    caseKey: string,
}


export interface IRegister {
    model: string,
    username: string
    afterSelect: string[]
    row: IRow
    keyField: IKeyValuePair<string, string>
    valueField: IKeyValuePair<string, string>
    relaxMode?: boolean
}

export type SqlOperators = "<" | ">" | "=" | "<=" | ">=" | "like" | "LIKE" | "IN" | "in" |
    "not like" | "NOT LIKE" |
    "NOT IN" | "not in" |
    "between" | "BETWEEN" | "!=" | "IS NOT NULL" | "<>"

export type JoinTypes = "INNER" | "LEFT" | "RIGHT"

export type SortTypes = "ASC" | "DESC"