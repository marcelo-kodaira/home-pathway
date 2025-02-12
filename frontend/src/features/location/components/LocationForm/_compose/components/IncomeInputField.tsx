import { Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LocationFormErrors,
  LocationFormValues,
} from "../../locationForm.schema";

type IncomeInputFieldProps = {
  control: Control<LocationFormValues>;
  error?: LocationFormErrors["income"];
};

export function IncomeInputField({ control, error }: IncomeInputFieldProps) {
  return (
    <div className="mb-4">
      <Label className="block text-sm font-medium mb-1">
        Your Annual Income ($)
      </Label>
      <Controller
        name="income"
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            value={field.value ?? ""}
            data-cy="income-input"
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
