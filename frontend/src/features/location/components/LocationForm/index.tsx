import React from "react";
import { Button } from "@/components/ui/button";
import { useLocationForm } from "../../hooks/useLocationForm";
import { LocationFormProps } from "./types";
import { StateSelectField } from "./_compose/components/StateSelectField";
import { CountySelectField } from "./_compose/components/CountySelectField";
import { IncomeInputField } from "./_compose/components/IncomeInputField";

export const LocationForm: React.FC<LocationFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    onSubmit: handleFormSubmit,
    errors,
    selectedState,
    countiesData,
    countiesLoading,
    autoLocationAvailable,
  } = useLocationForm(onSubmit);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="p-4 bg-white shadow rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Enter Your Information</h2>

      <StateSelectField
        control={control}
        autoLocationAvailable={autoLocationAvailable}
        error={errors.stateCode}
      />

      <CountySelectField
        control={control}
        selectedState={selectedState}
        countiesData={countiesData}
        countiesLoading={countiesLoading}
        error={errors.countyCode}
      />

      <IncomeInputField control={control} error={errors.income} />

      <Button type="submit">Compare Income</Button>
    </form>
  );
};
