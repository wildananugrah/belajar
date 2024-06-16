describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    cy.wait(1000).get("[data-cyid='linkDontHaveAnAccount']").click();
    cy.get("[data-cyid='inputEmail']").click().type("test3@gmail.com");
    cy.get("[data-cyid='inputPassword']").click().type("p@ssw0rd");
    cy.get("[data-cyid='inputConfirmPassword']").click().type("p@ssw0rd");
    cy.wait(1000).get("[data-cyid='buttonRegister']").click();
  });
});
