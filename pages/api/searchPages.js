import { connectToDatabase } from "../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const textTvPages = await db.collection("textTvPages").find({}).toArray();
  console.log(textTvPages);
  res.json(textTvPages);
};
