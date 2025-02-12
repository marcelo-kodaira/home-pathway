/// <reference types="cypress" />
/// <reference types="jest" />

jest.mock("../../api/hooks/useMedianIncome", () => ({
  useMedianIncome: jest.fn(),
}));

describe("IncomeResult Component", () => {
  const stateCode = "02";
  const countyCode = "066";
  const userIncome = "50000";

  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("renders loading state", () => {
    (useMedianIncome as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    mount(
      <IncomeResult
        stateCode={stateCode}
        countyCode={countyCode}
        userIncome={userIncome}
      />
    );
    cy.contains("Loading median income data...").should("be.visible");
  });

  it("renders error state", () => {
    (useMedianIncome as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: new Error("Failed to fetch data"),
    });

    mount(
      <IncomeResult
        stateCode={stateCode}
        countyCode={countyCode}
        userIncome={userIncome}
      />
    );
    cy.contains("Error loading income data").should("be.visible");
  });

  it("renders valid median income data", () => {
    (useMedianIncome as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [
        ["NAME", "B19013_001E"],
        ["Sample County", "60000"],
      ],
      error: null,
    });

    mount(
      <IncomeResult
        stateCode={stateCode}
        countyCode={countyCode}
        userIncome={userIncome}
      />
    );
    cy.contains("Income Comparison").should("be.visible");
    cy.contains("Median Household Income: $60,000").should("be.visible");
    cy.contains("Your Income: $50,000").should("be.visible");
    cy.contains("10,000 dollars below the median").should("be.visible");
  });

  it("renders when median income is not available", () => {
    (useMedianIncome as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: null,
    });

    mount(
      <IncomeResult
        stateCode={stateCode}
        countyCode={countyCode}
        userIncome={userIncome}
      />
    );
    cy.contains("Median income data not available for this county").should(
      "be.visible"
    );
  });
});
