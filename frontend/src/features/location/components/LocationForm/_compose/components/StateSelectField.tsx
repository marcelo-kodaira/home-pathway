import { Control, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationFormErrors, LocationFormValues } from "../../locationForm.schema";
import { stateMapping } from "@/features/location/utils/stateMapping";

type StateSelectFieldProps = {
  control: Control<LocationFormValues>;
  autoLocationAvailable: boolean;
  error?: LocationFormErrors["stateCode"];
};

export function StateSelectField({
  control,
  autoLocationAvailable,
  error,
}: StateSelectFieldProps) {
  return (
    <div className="mb-2">
      <Label className="block text-sm font-medium mb-1">State</Label>
      <Controller
        name="stateCode"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger data-cy="state-select-trigger" className="w-[280px]">
              <SelectValue
                placeholder={
                  autoLocationAvailable ? "Detecting..." : "Select a state"
                }
              />
            </SelectTrigger>
            <SelectContent data-cy="state-select-content">
              <SelectItem value="empty" disabled>
                {autoLocationAvailable
                  ? "Detecting your state..."
                  : "Select a state"}
              </SelectItem>
              {Object.values(stateMapping).map((state) => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
