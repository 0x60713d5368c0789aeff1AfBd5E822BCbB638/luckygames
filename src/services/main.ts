import request from "./index";

/*request api*/
export async function getPrizeList(data: any) {
  return request("/list", { method: "GET", params: data });
}
