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
