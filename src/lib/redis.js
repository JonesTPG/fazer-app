import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
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

export async function createFavoriteTextTvPage(data) {
  await connect();

  const repository = new Repository(schema, client);

  const favoriteTextTvPage = repository.createEntity(data);

  const id = await repository.save(favoriteTextTvPage);
  return id;
}

export async function getFavoriteTextTvPage(id) {
  await connect();

  const repository = new Repository(schema, client);
  return repository.fetch(id);
}

export async function createIndex() {
  await connect();

  const repository = new Repository(schema, client);
  await repository.createIndex();
}

export async function searchFavoritePages(q) {
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
