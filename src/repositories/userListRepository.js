import { UserList } from '../models/userListModel.js';
import { SORT_OPTIONS } from '../constants/userList/index.js';

export class UserListRepository {
    async create(listData) {
        const list = new UserList(listData);
        const savedList = await list.save();
        return this.#formatList(savedList);
    }

    async findById(id) {
        const list = await UserList.findById(id).lean();
        return list ? this.#formatList(list) : null;
    }

    async findOneAndDelete(id, userId) {
        const result = await UserList.findOneAndDelete({ _id: id, userId }).lean();
        return result ? this.#formatList(result) : null;
    }

    async findUserLists(userId, isPublic = null) {
        const query = isPublic !== null ? { userId, isPublic } : { userId };

        const lists = await UserList.find(query).sort(SORT_OPTIONS.UPDATED_AT_DESC).lean();

        return lists.map((list) => this.#formatList(list));
    }

    #formatList(list) {
        return {
            ...list,
            id: list._id.toString(),
            userId: list.userId.toString(),
            createdAt: list.createdAt.toISOString(),
            updatedAt: list.updatedAt.toISOString(),
        };
    }
}
