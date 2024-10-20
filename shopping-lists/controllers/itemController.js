import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const formData = await request.formData();
  const name = formData.get("name");

  await itemService.addItem(name, urlParts[2]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const viewItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    list: urlParts[2],
    uncompletedItems: await itemService.findUncompletedItemsbyShoppintListId(urlParts[2]),
    completedItems: await itemService.findCompletedItemsbyShoppintListId(urlParts[2]),
  };

  return new Response(await renderFile("item.eta", data), responseDetails);
};

const updateCollectedItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  await itemService.updateCollectedItem(urlParts[4]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { addItem, updateCollectedItem, viewItem };
