import { sql } from "../database/database.js";
const findAllLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
  };

const addLists = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
  };

  const completeListById = async (id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
  };

const listsCount = async () => {
    const rows = await sql`SELECT COUNT(*) FROM shopping_lists`;
    if (rows.length > 0) {
      return rows[0].count;
    }
};

export {addLists, findAllLists, listsCount, completeListById };