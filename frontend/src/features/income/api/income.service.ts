import { axiosClient } from "@/config/api/axios";
import { censusRoutes } from "@/config/api/routes";
import { GetMedianIncomeResponse } from "./response/getMedianIncomeResponse";

export async function fetchMedianIncome(stateCode: string, countyCode: string) {
  const url = censusRoutes.medianIncome(stateCode, countyCode);
  const { data } = await axiosClient.get<GetMedianIncomeResponse>(url);
  return data;
}
