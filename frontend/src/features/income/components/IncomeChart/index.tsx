import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useMedianIncome } from "../../api/hooks/useMedianIncome";
import { IncomeChartProps } from "./types";
import { getIncomeDifference } from "@/features/utils/calculateIncomeDifference";

export const IncomeChart = ({ formData }: IncomeChartProps) => {
  const chartConfig: ChartConfig = {
    userIncome: {
      label: "Your income",
      color: "hsl(var(--chart-1))",
    },
    medianIncome: {
      label: "Median income",
      color: "hsl(var(--chart-2))",
    },
  };

  const { data } = useMedianIncome(formData?.stateCode, formData?.countyCode);
  const medianIncome = data?.[1]?.[1];
  if (!medianIncome) return null;

  const medianValue = parseInt(medianIncome, 10);
  const userIncome = formData.income ?? 0;

  const { diffPercent, isHigher, diffLabel } = getIncomeDifference(
    userIncome,
    medianValue
  );

  const TrendIcon = isHigher ? TrendingUp : TrendingDown;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Comparison</CardTitle>
        <CardDescription>Your Income vs. County Median</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={[
              {
                name: "Median Income",
                income: medianValue,
              },
              {
                name: "Your Income",
                income: userIncome,
              },
            ]}
            layout="vertical"
            margin={{ left: -20 }}
          >
            <XAxis type="number" dataKey="income" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="income" fill="var(--color-userIncome)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {diffPercent === 0 ? (
          <div className="flex gap-2 font-medium leading-none">
            Your income is the same as the median.
          </div>
        ) : (
          <div className="flex gap-2 font-medium leading-none">
            Your income is {diffLabel} than the county median
            <TrendIcon className="h-4 w-4" />
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Data based on the 2021 ACS from the U.S. Census.
        </div>
      </CardFooter>
    </Card>
  );
};
