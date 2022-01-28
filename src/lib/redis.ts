import { Client, Entity, EntityCreationData, Repository, Schema } from "redis-om";

export const client = new Client();

export async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class FavoriteTextTvPage extends Entity {}
let schema = new Schema(
  FavoriteTextTvPage,
  {
    nickname: { type: "string" },
    reason: { type: "string", textSearch: true },
    pageNumber: { type: "string" },
  },
  {
    dataStructure: "JSON",
  },
);

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

export async function createFavoriteTextTvPage(data: unknown) {
  await connect();
  const repository = new Repository(schema, client);

  const favoriteTextTvPage = repository.createEntity(data as EntityCreationData);
  const id = await repository.save(favoriteTextTvPage);

  return id;
}

export async function getFavoriteTextTvPage(id: string) {
  await connect();
  const repository = new Repository(schema, client);

  return repository.fetch(id);
}

export async function createIndex() {
  await connect();
  const repository = new Repository(schema, client);

  await repository.createIndex();
}

export async function searchFavoritePages(q: string) {
  await connect();

  const repository = new Repository(schema, client);

  const textTvPages = await repository
    .search()
    .where("nickname")
    .eq(q)
    .or("pageNumber")
    .eq(q)
    .or("reason")
    .matches(q)
    .return.all();

  return textTvPages;
}

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
