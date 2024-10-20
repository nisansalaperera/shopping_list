import { sql } from "../database/database.js";

const itemCount = async () => {
  const rows = await sql`SELECT COUNT(*) FROM shopping_list_items`;
  if (rows.length > 0) {
    return rows[0].count;
  }
};

const findById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_list_items WHERE id = ${id}`;

  if (rows && rows.length > 0) {
    console.log(rows);
    return rows[0];
  }
  return { id: 0, name: "Unknown" };
};

const findItemsbyShoppintListId = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = (${listId}) ORDER BY collected`;
};

const findUncompletedItemsbyShoppintListId = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = (${listId}) AND collected = false  ORDER BY name`;
};

const findCompletedItemsbyShoppintListId = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = (${listId}) AND collected = true  ORDER BY name`;
};

const addItem = async (name, shoppinglistId) => {
  await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${name}, ${shoppinglistId})`;
};

const updateCollectedItem = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id}`;
};

export {
  addItem,
  findById,
  findItemsbyShoppintListId,
  itemCount,
  updateCollectedItem,
  findUncompletedItemsbyShoppintListId,
  findCompletedItemsbyShoppintListId
};
