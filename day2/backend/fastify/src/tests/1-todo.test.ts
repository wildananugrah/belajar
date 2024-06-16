import { Pool } from "pg";

import {
  dbConnectionTimeout,
  dbDatabase,
  dbIdleTimeout,
  dbMaxUses,
  dbPass,
  dbPoolMax,
  dbPoolMin,
  dbPort,
  dbUser,
  dbhost,
} from "../configs/db.config";
import { IUserService } from "../dependencies/iuser.service";
import UserService from "../dependencies/impl/user.service";
import { LogicException } from "../exceptions/logic.exception";
import { ITodoService } from "../dependencies/itodo.service";
import { TodoService } from "../dependencies/impl/todo.service";

const config = {
  host: dbhost,
  database: dbDatabase,
  port: dbPort,
  user: dbUser,
  password: dbPass,
  ssl: false,
  min: dbPoolMin,
  max: dbPoolMax,
  idleTimeoutMillis: dbIdleTimeout,
  connectionTimeoutMillis: dbConnectionTimeout,
  maxUses: dbMaxUses,
};
const pool = new Pool(config);

beforeAll(async () => {
  console.log(`Connecting to ${dbhost}:${dbPort} databases...`);
  console.log(config);
});

afterAll(async () => {
  await pool.end();
});

describe("Todo Service normal", () => {
  const identifier: string = "testuser2";
  const password: string = "p@ssw0rd";

  const todo: {
    name: string;
    description: string;
  } = {
    name: "todo 1",
    description: "todo 1 description",
  };

  const updatedTodo: {
    name: string;
    description: string;
  } = {
    name: "todo 1 update",
    description: "todo 1 description update",
  };

  let todoId: string = "";
  let userId: string = "";

  it("should be registered new user", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.register(identifier, password);
    expect(userdb.identifier).toBe(identifier);
    expect(userdb.password).toBe(password);
    userId = userdb.id;
  });

  it("should be logged in a user", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.login(identifier);
    if (userdb === null) throw new LogicException(400, "Invalid identifier");
    expect(userdb.identifier).toBe(identifier);
    expect(userdb.password).toBe(password);
  });

  it("should be inserting todo", async () => {
    const todoService: ITodoService = new TodoService(pool);
    const tododb = await todoService.insert(
      todo.name,
      todo.description,
      userId
    );
    expect(tododb.name).toBe(todo.name);
    expect(tododb.description).toBe(todo.description);
    expect(typeof tododb.id === "string").toBe(true);
    todoId = tododb.id;
  });

  it("should be getting todo list", async () => {
    const todoService: ITodoService = new TodoService(pool);
    const tododb = await todoService.list(userId);
    expect(tododb.length > 0).toBe(true);
    expect(tododb[0].name).toBe(todo.name);
    expect(tododb[0].description).toBe(todo.description);
  });

  it("should be getting a todo", async () => {
    const todoService: ITodoService = new TodoService(pool);
    const tododb = await todoService.detail(todoId);
    expect(tododb.name).toBe(todo.name);
    expect(tododb.description).toBe(todo.description);
  });

  it("should be updating a todo", async () => {
    const todoService: ITodoService = new TodoService(pool);
    const tododb = await todoService.update(
      updatedTodo.name,
      updatedTodo.description,
      todoId
    );
    expect(tododb).toBe(true);
  });

  it("should be getting a todo", async () => {
    const todoService: ITodoService = new TodoService(pool);
    const tododb = await todoService.detail(todoId);
    expect(tododb.name).toBe(updatedTodo.name);
    expect(tododb.description).toBe(updatedTodo.description);
  });

  it("should be deleting a todo", async () => {
    const todoService: ITodoService = new TodoService(pool);
    const tododb = await todoService.delete(todoId);
    expect(tododb).toBe(true);
  });

  it("should be deleting a user", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.deleteByIdentifier(identifier);
    expect(userdb).toBe(true);
  });
});
