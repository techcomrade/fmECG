import { UserModel } from "../../../entities/user.model";

export interface UserServiceInterface {
    findAll(): Promise<UserModel[]>;

    add(user: UserModel): Promise<Boolean>;

    findByUserName(username: string): Promise<any>;
}