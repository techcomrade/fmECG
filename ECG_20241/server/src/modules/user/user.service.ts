import { UserRequest } from "./dto/user.request";
import { UserResponse } from "./dto/user.response";
import { UserServiceInterface } from "./interfaces/user.service.interface";
import { UserRepository } from "./user.repository";
const { v4: uuidv4 } = require("uuid");

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  async getAllUsers(): Promise<UserResponse[]> {
    return this.userRepository.getAllUsers();
  }

  async add(user: UserRequest) {
    user.id = uuidv4();
    return await this.userRepository.add(user);
  }

  async getUserByUserName(username: string): Promise<any> {
    return await this.userRepository.getUserByUserName(username);
  }

  async getUserById(id: string): Promise<UserResponse> {
    return await this.userRepository.getUserById(id);
  }

  async updateUserById(user: UserRequest, id: string) {
    return await this.userRepository.updateUserById(user, id);
  }

  async deleteUserById(id: string) {
    return await this.userRepository.deleteUserById(id);
  }
}
