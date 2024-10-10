import { UserModel } from "../../entities/user.model";
import { UserServiceInterface } from "./interfaces/user.service.interface";
import { UserRepository } from "./user.repository";
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class UserService implements UserServiceInterface{
  constructor(private userRepository: UserRepository) {}


  async findAll(): Promise<UserModel[]> {
    return this.userRepository.findAll();
  }

  async add(user: UserModel): Promise<Boolean> {
    const existingData = 0;
    if (existingData) {
      throw new ConflictException("Email already in use");
    } else {
      try {
        await this.userRepository.add(user);
      } catch (error) {
        console.log("User.service.add failed", error);
        return false;
      }
    }
  }

  async findByUserName(username: string): Promise<any> {
      try{
        return await this.userRepository.findByUserName(username);
      }
      catch (error) {
        console.log("User.service.findByUserName failed", error);
        return false;
      }
  }
}
