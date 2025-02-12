export const censusBaseUrl = "https://api.census.gov";
export const fccBaseUrl = "https://geo.fcc.gov";

export const censusRoutes = {
  counties: (stateCode: string) =>
    `${censusBaseUrl}/data/2020/dec/pl?get=NAME&for=county:*&in=state:${stateCode}`,
  medianIncome: (stateCode: string, countyCode: string) =>
    `${censusBaseUrl}/data/2021/acs/acs5?get=NAME,B19013_001E&for=county:${countyCode}&in=state:${stateCode}`,
};

export const fccRoutes = {
  fipsFromCoordinates: (lat: number, lon: number) =>
    `${fccBaseUrl}/api/census/block/find?latitude=${lat}&longitude=${lon}&format=json`,
};
