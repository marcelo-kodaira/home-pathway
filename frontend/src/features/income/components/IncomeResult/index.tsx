import { useMedianIncome } from "../../api/hooks/useMedianIncome";
import { IncomeResultProps } from "./types";

export const IncomeResult: React.FC<IncomeResultProps> = ({
  stateCode,
  countyCode,
  userIncome,
}) => {
  const { data, isLoading, error } = useMedianIncome(stateCode, countyCode);

  const medianIncome = data?.[1]?.[1];
  const userIncomeNum = parseInt(userIncome);
  const isValidIncome = !isNaN(userIncomeNum) && userIncomeNum > 0;
  const isValidMedian =
    medianIncome && !isNaN(+medianIncome) && +medianIncome > 0;

  return (
    <div className="mt-4 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Income Comparison</h2>

      {isLoading && <p>Loading median income data...</p>}
      {error && <p className="text-red-500">Error loading income data</p>}

      {isValidMedian && (
        <div className="space-y-2">
          <p className="text-lg">
            Median Household Income:{" "}
            <span className="font-semibold">
              ${parseInt(medianIncome).toLocaleString()}
            </span>
          </p>
          <p className="text-lg">
            Your Income:{" "}
            <span className="font-semibold">
              ${userIncomeNum.toLocaleString()}
            </span>
          </p>
          {isValidIncome && (
            <p className="text-lg">
              You are{" "}
              <span
                className={
                  userIncomeNum > +medianIncome
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {Math.abs(userIncomeNum - +medianIncome).toLocaleString()}
              </span>{" "}
              dollars {userIncomeNum > +medianIncome ? "above" : "below"} the
              median
            </p>
          )}
        </div>
      )}

      {!isValidMedian && !isLoading && !error && (
        <p>Median income data not available for this county</p>
      )}
    </div>
  );
};
