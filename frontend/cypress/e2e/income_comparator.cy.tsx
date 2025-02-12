/// <reference types="cypress" />

describe("Income Comparator - E2E", () => {
  beforeEach(() => {
    cy.intercept("GET", /https:\/\/api\.census\.gov\/data\/2021\/acs\/acs5.*/, {
      statusCode: 200,
      body: [
        ["NAME", "B19013_001E"],
        ["Bethel", "60000"],
      ],
    }).as("getIncomeData");

    cy.visit("/");
  });

  describe("Income Comparator with Manual Location", () => {
    it("should complete the income comparison workflow inputing the data manually", () => {
      cy.get('[data-cy="state-select-trigger"]').should("be.visible").click();
      cy.get('[data-cy="state-select-content"]')
        .should("be.visible")
        .contains("Alaska")
        .click();
      cy.get('[data-cy="state-select-trigger"]').should("contain", "Alaska");

      cy.get('[data-cy="county-select-trigger"]').should("be.visible").click();
      cy.get('[data-cy="county-select-content"]')
        .should("be.visible")
        .contains("Bethel")
        .click();
      cy.get('[data-cy="county-select-trigger"]').should("contain", "Bethel");

      cy.get('[data-cy="income-input"]').clear().type("50000");

      cy.contains("Compare Income").should("exist").click();

      cy.contains("Loading median income data...").should("be.visible");

      cy.wait("@getIncomeData").its("response.statusCode").should("eq", 200);

      cy.contains("Income Comparison").should("be.visible");
      cy.contains("Median Household Income: $60,000").should("be.visible");
      cy.contains("Your Income: $50,000").should("be.visible");
      cy.contains("10,000 dollars below the median").should("be.visible");

      cy.log("✅ Test Passed: Income Comparison flow works correctly!");
    });
  });

  describe("Income Comparator with Auto‑Location", () => {
    beforeEach(() => {
      cy.intercept(
        "GET",
        /https:\/\/geo\.fcc\.gov\/api\/census\/block\/find.*/,
        {
          statusCode: 200,
          body: {
            State: { FIPS: "48", name: "Texas" },
            County: { FIPS: "201" },
          },
        }
      ).as("getFipsData");


      cy.intercept(
        "GET",
        /https:\/\/api\.census\.gov\/data\/2020\/dec\/pl\?get=NAME&for=county:\*&in=state:48/,
        {
          statusCode: 200,
          body: [
            ["NAME", "state", "countyCode"],
            ["Harris County", "48", "201"],
          ],
        }
      ).as("getCounties");

      cy.intercept(
        "GET",
        /https:\/\/api\.census\.gov\/data\/2021\/acs\/acs5.*/,
        {
          statusCode: 200,
          body: [
            ["NAME", "B19013_001E"],
            ["Harris County", "60000"],
          ],
        }
      ).as("getIncomeData");

      cy.visit("/", {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, "geolocation", {
            value: {
              getCurrentPosition: (success) => {
                success({
                  coords: { latitude: 29.7604, longitude: -95.3698 },
                });
              },
            },
            writable: true,
          });
        },
      });
    });

    it("should auto‑select the location and complete the income comparison workflow", () => {
     
      cy.wait("@getFipsData");
      cy.wait("@getCounties");

     
      cy.get('[data-cy="state-select-trigger"]').should("contain", "Texas");
      cy.get('[data-cy="county-select-trigger"]').should(
        "contain",
        "Harris County"
      );

     
      cy.get('[data-cy="income-input"]').clear().type("50000");

    
      cy.contains("Compare Income").click();

      cy.wait("@getIncomeData").its("response.statusCode").should("eq", 200);


      cy.contains("Income Comparison").should("be.visible");
      cy.contains("Median Household Income: $60,000").should("be.visible");
      cy.contains("Your Income: $50,000").should("be.visible");
      cy.contains("10,000 dollars below the median").should("be.visible");
    });
  });

});
