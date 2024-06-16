import { trace } from "@opentelemetry/api";
import { IJWTService } from "../dependencies/ijwt";
import { ITodoService } from "../dependencies/itodo.service";
import { IUserDB } from "../helpers/types/user-db.dto";
import { ITodoDB } from "../helpers/types/todo-db.dto";

export class Todo {
  private todoService: ITodoService;
  private jwtService: IJWTService;
  constructor({
    todoService,
    jwtService,
  }: {
    todoService: ITodoService;
    jwtService: IJWTService;
  }) {
    this.todoService = todoService;
    this.jwtService = jwtService;
  }
  async create(
    name: string,
    description: string,
    token: string
  ): Promise<ITodoDB> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.todoService.create");
    const userDb: IUserDB = await this.jwtService.validate(token);
    const userId = userDb.id;
    const todoDb = await this.todoService.insert(name, description, userId);
    span.end();
    return todoDb;
  }

  async findAll(token: string): Promise<ITodoDB[]> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.todoService.findAll");
    const userDb: IUserDB = await this.jwtService.validate(token);
    const userId = userDb.id;
    const todoDb = await this.todoService.list(userId);
    span.end();
    return todoDb;
  }

  async findById(todoId: string): Promise<ITodoDB> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.todoService.findById");
    const todoDb = await this.todoService.detail(todoId);
    span.end();
    return todoDb;
  }

  async update(
    name: string,
    description: string,
    id: string
  ): Promise<boolean> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.todoService.findById");
    const todoDb = await this.todoService.update(name, description, id);
    span.end();
    return todoDb;
  }

  async delete(todoId: string): Promise<boolean> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.todoService.findById");
    const todoDb = await this.todoService.delete(todoId);
    span.end();
    return todoDb;
  }
}
