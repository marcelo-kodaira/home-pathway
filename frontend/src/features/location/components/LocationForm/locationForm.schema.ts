import { FieldErrors } from "react-hook-form";
import { z } from "zod";

export const locationFormSchema = z
  .object({
    stateCode: z.string().min(1, "State is required"),
    countyCode: z.string().min(1, "County is required"),
    income: z.preprocess((val) => {
      if (typeof val === "string") {
        if (!val.trim()) return undefined;
        const parsed = parseFloat(val);
        return isNaN(parsed) ? undefined : parsed;
      }
      return val;
    }, z.number({ message: "Income is required" }).min(1, "Income is required").positive("Income must be positive")),
  })
  .superRefine((data, ctx) => {
    if (data.stateCode === "empty") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "State cannot be empty",
        path: ["stateCode"],
      });
    }
    if (data.countyCode === "empty") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "County cannot be empty",
        path: ["countyCode"],
      });
    }
  });

export type LocationFormValues = z.infer<typeof locationFormSchema>;
export type LocationFormErrors = FieldErrors<LocationFormValues>;
