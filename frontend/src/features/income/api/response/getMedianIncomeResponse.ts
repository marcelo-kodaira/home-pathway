type CensusIncomeHeader = ["NAME", "B19013_001E", "state", "county"];

type CensusIncomeRow = [
  name: string,
  medianIncome: string,
  stateCode: string,
  countyCode: string
];

export type GetMedianIncomeResponse = [
  CensusIncomeHeader,
  ...CensusIncomeRow[]
];
