import { getPrizeList } from "@/services/main";
import { makeAutoObservable, runInAction } from "mobx";

/* store class */
export class FomoStore {
  constructor() {
    makeAutoObservable(this);
  }
  PrizeList: any = [];

  async getList() {
    const ret: any = await getPrizeList({ page: 1, size: 6 });
    if (ret.errorNo == 200) {
      runInAction(() => {
        this.PrizeList = ret.result.list;
      });
    }
  }
}
