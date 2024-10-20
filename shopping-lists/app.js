import { serve } from "https://deno.land/std@0.222.1/http/server.ts";
import { configure } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as requestUtils from "./utils/requestUtils.js";
import * as listsController from "./controllers/listsController.js";
import * as itemController from "./controllers/itemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url);
  
    if (url.pathname === "/" && request.method === "GET") {
      return await listsController.viewStats(request); //done
    } else if (url.pathname === "/lists" && request.method === "GET") {
      return await listsController.viewCurrentList(request);
    } else if (url.pathname === "/lists" && request.method === "POST") {
      return await listsController.addLists(request);
    } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
      return await itemController.viewItem(request);
    }else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
      return await itemController.updateCollectedItem(request); 
    } else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
      return await itemController.addItem(request);
    }else if (url.pathname.match("lists/[0-9]+/deactivate") && request.method === "POST") {
      return await listsController.completeListById(request);
    }else {
      return new Response("Not found", { status: 404 });
    }
  };

serve(handleRequest, { port: 7777 });