import { LocationFormValues } from "./locationForm.schema";

export interface LocationFormProps {
  onSubmit: (data: LocationFormValues) => void;
}
