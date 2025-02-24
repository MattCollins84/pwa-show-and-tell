import { UserItem } from "@/context/UserProvider";

interface UserItemStore {
  [key: string]: UserItem[]
}

class UserItems {

  readonly items: UserItemStore = {}

  constructor() {

  }

  public getItems(userID: string): UserItem[] {
    return this.items[userID] || [];
  }

  public addItem(userID: string, item: UserItem): UserItem[] {
    if (!this.items[userID]) {
      this.items[userID] = [];
    }
    item = {
      ...item,
      count: 0
    }
    this.items[userID].push(item);
    return this.getItems(userID);
  }

  public incrementItem(userID: string, item: UserItem): UserItem[] {
    console.log('items', this.items[userID])
    if (!this.items[userID]) {
      return [];
    }
    const matchedItem = this.items[userID].find(i => i.name === item.name);
    console.log({ matchedItem})
    if (!matchedItem) return this.getItems(userID);
    matchedItem.count++;
    console.log({ matchedItem})
    return this.getItems(userID);
  }

  public decrementItem(userID: string, item: UserItem): UserItem[] {
    if (!this.items[userID]) {
      return [];
    }
    const matchedItem = this.items[userID].find(i => i.name === item.name);
    if (!matchedItem) return this.getItems(userID);
    matchedItem.count--;
    return this.getItems(userID);
  }

}

const userItemsDB = new UserItems();

export default userItemsDB