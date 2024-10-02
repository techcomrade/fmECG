import { UserModel } from './model/user.model';
import { UserRepository } from './model/user.repository';
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository
    ) { }

    async findAll(): Promise<UserModel[]> {
        return this.userRepository.findAll();
    }

    async add(user: UserModel) {
        const existingData = await this.findByEmail(user.email);
        if (existingData) {
            throw new ConflictException('Email already in use');
        }
        else {
            try {
                await this.userRepository.add(user);
            }
            catch (error) {
                console.log("User.service.add failed", error);
                return false;
            }
        }
    }

    async findByEmail(email: string): Promise<UserModel | any> {
        return await this.userRepository.findByEmail(email);
    }
}