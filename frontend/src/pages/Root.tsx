import { useState } from "react";
import { LocationFormValues } from "@/features/location/components/LocationForm/locationForm.schema";
import { LocationForm } from "@/features/location/components/LocationForm";
import { IncomeResult } from "@/features/income/components/IncomeResult";
import { IncomeChart } from "@/features/income/components/IncomeChart";

export const RootPage: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<LocationFormValues | null>(
    null
  );

  return (
      <div className="flex flex-col items-center bg-gray-50 justify-center  min-h-[90vh]">
      <div className=" flex w-screen h-[50%] bg-gray-100 p-6">
        <div className="max-w-[1400px] items-center mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-36 items-center">
            <div className="bg-white mx-auto p-4 w-fit shadow rounded h-fit">
              <LocationForm onSubmit={(data) => setSubmittedData(data)} />
            </div>
            <div className="flex flex-col gap-4">
              {submittedData ? (
                <>
                  <div className="bg-white p-4 shadow rounded">
                    <IncomeResult
                      stateCode={submittedData.stateCode}
                      countyCode={submittedData.countyCode}
                      userIncome={submittedData.income.toString()}
                    />
                  </div>

                  <div className="bg-white p-4 shadow rounded">
                    <IncomeChart formData={submittedData} />
                  </div>
                </>
              ) : (
                <div className="bg-white p-4 shadow rounded flex items-center justify-center h-full">
                  <p className="text-gray-500">
                    Submit the form to see your income comparison
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
