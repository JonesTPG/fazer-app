import { Entity, Repository, Schema } from "redis-om";
import { client, connect } from "./redis";

class TodoSchema extends Entity {}
let todoSchema = new Schema(
  TodoSchema,
  {
    username: { type: "string" },
    ipAddress: { type: "string" },
    todos: { type: "array" },
  },
  {
    dataStructure: "JSON",
  },
);

export interface TodoType {
  id: string;
  content: string;
}
export interface TodoModel {
  entityId: string;
  username?: string;
  ipAddress?: string;
  todos?: TodoType[];
}

export interface UserTodoData {
  username?: string;
  todos?: TodoType[];
}

export async function readTodos(ip: string): Promise<UserTodoData | null> {
  await connect();
  const repository = new Repository(todoSchema, client);
  const res = (await repository.fetch(ip)).toJSON() as TodoModel;

  if (!res.username) {
    return null;
  }

  return { todos: res.todos || [], username: res.username };
}

export async function createTodos(ip: string, username: string): Promise<string | null> {
  if (!ip || !username) {
    return null;
  }
  await connect();
  const repository = new Repository(todoSchema, client);

  const profile = repository.createEntity({ ipAddress: ip, username, todos: [] });
  const id = await repository.save(profile);

  return id || null;
}

export async function updateTodos(ip: string, todos: TodoType[]): Promise<string | null> {
  if (!ip || !todos) {
    return null;
  }
  await connect();
  const repository = new Repository(todoSchema, client);

  const res = (await repository.fetch(ip)).toJSON() as TodoModel;

  if (!res.username) {
    return null;
  }

  const id = await repository.save({ ...res, todos } as TodoSchema);

  return id || null;
}

export async function deleteTodos(ip: string, todos: TodoType[]): Promise<string | null> {
  if (!ip || !todos) {
    return null;
  }
  await connect();
  const repository = new Repository(todoSchema, client);

  const res = (await repository.fetch(ip)).toJSON() as TodoModel;

  if (!res.username) {
    return null;
  }

  const id = await repository.save({ ...res, todos } as TodoSchema);

  return id || null;
}
