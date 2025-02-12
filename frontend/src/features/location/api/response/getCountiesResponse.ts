type CountyHeader = ["NAME", "state", "county"];

type CountyDataRow = [string, string, string];

export type GetCountiesResponse = [CountyHeader, ...CountyDataRow[]];
