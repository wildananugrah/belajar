describe("template spec", () => {
  it("passes", () => {
    cy.clearAllLocalStorage();
    cy.wait(1000);
    cy.visit("http://localhost:3000");
    cy.get("[data-cyid='inputEmail']").click().type("test3@gmail.com");
    cy.get("[data-cyid='inputPassword']").click().type("p@ssw0rd");
    cy.wait(1000).get("[data-cyid='buttonLogin']").click();
  });
});
