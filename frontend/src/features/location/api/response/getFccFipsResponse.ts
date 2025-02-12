export interface GetFccFipsResponse {
  messages: string[];
  Block: {
    FIPS: string;
    bbox: [number, number, number, number];
  };
  County: {
    FIPS: string;
    name: string;
  };
  State: {
    FIPS: string;
    code: string;
    name: string;
  };
  status: string;
  executionTime: string;
}
