function login() {
  cy.clearAllLocalStorage();
  cy.wait(1000);
  cy.visit("http://localhost:3000");
  cy.get("[data-cyid='inputEmail']").click().type("test@mail.com");
  cy.get("[data-cyid='inputPassword']").click().type("p@ssw0rd");
  cy.wait(1000).get("[data-cyid='buttonLogin']").click();
}

function clickTodoMenu() {
  cy.get("[data-cyid='todosMenuLink']").click();
}

function addTodo() {
  cy.get("[data-cyid='addTodoButton']").click();
  cy.get("[data-cyid='nameTodoInput']").click().type("todo 1");
  cy.get("[data-cyid='descriptionTodoInput']")
    .click()
    .type("todo 1 description");
  cy.get("[data-cyid='addTodoButtonSubmit']").click();
  cy.wait(1000).get("[data-cyid='addModal-closeButton']").click();
}

function deleteTodo() {
  cy.get("[data-cyid='deleteTodoLink-0']").click();
  cy.get("[data-cyid='deleteTodoButton']").click();
  cy.wait(1000);
}

function editTodo() {
  cy.get("[data-cyid='editTodoLink-0']").click();
  cy.get("[data-cyid='nameTodoEditInput']").click().clear()
  cy.get("[data-cyid='nameTodoEditInput']").click().type("todo 1 update");
  cy.get("[data-cyid='descriptionTodoEditInput']")
    .click()
    .clear();
  cy.get("[data-cyid='descriptionTodoEditInput']")
    .click()
    .type("todo 1 description update");
  cy.get("[data-cyid='editTodoButtonSubmit']").click();
  cy.wait(1000).get("[data-cyid='editModal-closeButton']").click();
}

function signout() {
  cy.get("[data-cyid='signoutMenuLink']").click();
}

describe("template spec", () => {
  it("passes", () => {
    login();
    clickTodoMenu();
    addTodo();
    cy.wait(2000);
    editTodo();
    cy.wait(2000);
    deleteTodo();
    cy.wait(2000);
    signout();
  });
});
