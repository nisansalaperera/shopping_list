import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listsService from "../services/listsService.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as itemService from "../services/itemService.js";


const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewCurrentList = async (request) => {
  const data = {
    lists: await listsService.findAllLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};


const addLists = async (request) => {
 
  const formData = await request.formData();
  const name = formData.get("name");

  await listsService.addLists(name);
  
  return requestUtils.redirectTo("/lists");
};


const completeListById = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  
  await listsService.completeListById(urlParts[2]);

  return requestUtils.redirectTo("/lists");
};

const viewStats = async (request) => {
  const listsCount = await listsService.listsCount();
  const itemCount = await itemService.itemCount();

  if (listsCount !== "0") {
    const data = {
      listsCount: listsCount,
      itemCount: itemCount,
    };

    return new Response(await renderFile("stats.eta", data), responseDetails);
  }
  return new Response("No shopping lists yet.", responseDetails);
};



export { viewStats, viewCurrentList, addLists, completeListById };
