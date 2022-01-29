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
  todos?: string[];
}

export interface UserTodoData {
  username?: string;
  todos?: TodoType[];
}

export async function readTodos(ip: string): Promise<TodoModel | null> {
  await connect();
  const repository = new Repository(todoSchema, client);
  const res = await repository.search().where("ipAddress").eq(ip).return.all();

  const data = res[0];

  return !!data ? (data.toJSON() as TodoModel) : null;
}

export async function createTodos(ip: string, username: string): Promise<string | null> {
  if (!ip || !username) {
    return null;
  }
  await connect();
  const repository = new Repository(todoSchema, client);
  const matches = await repository.search().where("ipAddress").eq(ip).return.all();

  if (!!matches.length) {
    return null;
  }

  const profile = repository.createEntity({
    ipAddress: ip,
    username,
    todos: [],
  });
  console.log("created profile: ", { profile });
  const id = await repository.save(profile);

  return id || null;
}

export async function updateTodos(ip: string, todos: TodoType[]): Promise<string | null> {
  if (!ip || !todos) {
    return null;
  }
  await connect();
  const repository = new Repository(todoSchema, client);
  const matches = await repository.search().where("ipAddress").eq(ip).return.all();

  if (matches.length !== 1) {
    return null;
  }
  const data = matches[0];

  const newData = {
    ...data,
    entityData: { ...data.entityData, todos },
  } as unknown as TodoSchema;

  console.log("found data: ", { data }, "new data: ", { newData });

  const id = await repository.save(newData as unknown as TodoSchema);

  return id || null;
}

export async function deleteTodos(ip: string, todos: TodoType[]): Promise<string | null> {
  if (!ip || !todos) {
    return null;
  }
  await connect();
  const repository = new Repository(todoSchema, client);
  const matches = await repository.search().where("ipAddress").eq(ip).return.all();

  if (matches.length !== 1) {
    return null;
  }
  const data = matches[0];

  const id = await repository.save({ ...data, todos } as unknown as TodoSchema);

  return id || null;
}

export async function createTodoIndex() {
  await connect();
  const repository = new Repository(todoSchema, client);

  await repository.createIndex();
}
