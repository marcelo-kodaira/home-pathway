import React from "react";
import { Control, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { LocationFormErrors, LocationFormValues } from "../../locationForm.schema";

type CountySelectFieldProps = {
  control: Control<LocationFormValues>;
  selectedState: string;
  countiesData?: string[][];
  countiesLoading: boolean;
  error?: LocationFormErrors["countyCode"];
};

export function CountySelectField({
  control,
  selectedState,
  countiesData,
  countiesLoading,
  error,
}: CountySelectFieldProps) {
  const getCountySelectItems = React.useCallback(() => {
    if (countiesLoading) {
      return [
        <SelectItem value="loading" disabled key="loading">
          Loading counties...
        </SelectItem>,
      ];
    }
    if (selectedState === "empty") {
      return [
        <SelectItem value="empty" disabled key="noState">
          Select a state first
        </SelectItem>,
      ];
    }
    if (!countiesData || countiesData.length <= 1) {
      return [
        <SelectItem value="empty" disabled key="noCounties">
          No counties found
        </SelectItem>,
      ];
    }

    const rows = countiesData.slice(1);
    const countyItems = rows.map((county) => (
      <SelectItem key={county[2]} value={county[2]}>
        {county[0]}
      </SelectItem>
    ));

    countyItems.push(
      <SelectItem value="empty" disabled key="selectCounty">
        Select a county
      </SelectItem>
    );
    return countyItems;
  }, [countiesLoading, selectedState, countiesData]);

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <Label className="block text-sm font-medium mb-1">County</Label>
        {countiesLoading && <Spinner />}
      </div>
      <Controller
        name="countyCode"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={selectedState === "empty"}
          >
            <SelectTrigger className="w-[280px]" data-cy="county-select-trigger">
              <SelectValue placeholder="Select a county" />
            </SelectTrigger>
            <SelectContent data-cy="county-select-content">{getCountySelectItems()}</SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
