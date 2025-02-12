import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  locationFormSchema,
  LocationFormValues,
} from "../components/LocationForm/locationForm.schema";
import { useCounties } from "../api/hooks/useCounties";
import { useAutoLocation } from "../api/hooks/useAutoLocation";

export function useLocationForm(onSubmit: (data: LocationFormValues) => void) {
  const {
    autoLocationAvailable,
    stateCode: autoStateCode,
    countyCode: autoCountyCode,
  } = useAutoLocation();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LocationFormValues>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      stateCode: "empty",
      countyCode: "empty",
      income: 0,
    },
  });

  const selectedState = watch("stateCode");

  const { data: countiesData, isLoading: countiesLoading } = useCounties(
    selectedState !== "empty" ? selectedState : ""
  );

  useEffect(() => {
    if (autoStateCode) {
      setValue("stateCode", autoStateCode);

      if (autoCountyCode && countiesData) {
        const countyExists = countiesData.some(
          (county) => county[2] === autoCountyCode
        );
        if (countyExists) {
          setValue("countyCode", autoCountyCode);
        }
      }
    }
  }, [autoStateCode, autoCountyCode, countiesData, setValue]);

  useEffect(() => {
    if (autoStateCode && autoCountyCode) {
      reset({
        stateCode: autoStateCode,
        countyCode: "empty",
        income: 0,
      });
    }
  }, [autoStateCode, autoCountyCode, reset]);

  useEffect(() => {
    if (autoCountyCode && countiesData && selectedState === autoStateCode) {
      const countyExists = countiesData.some(
        (county) => county[2] === autoCountyCode
      );
      setValue("countyCode", countyExists ? autoCountyCode : "empty");
    }
  }, [countiesData, autoCountyCode, selectedState, autoStateCode, setValue]);

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    selectedState,
    countiesData,
    countiesLoading,
    autoLocationAvailable,
  };
}
