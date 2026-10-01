import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserReqDto } from './dto/create-user.req.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { HashHelper } from '../helpers/hash.helper.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _repository: Repository<User>,
    private readonly _hashHelper: HashHelper,
  ) {}

  async create(createUserDto: CreateUserReqDto) {
    const user = await this._repository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (user != null) {
      throw new ConflictException('Користувач з таким email вже існує');
    }

    const hash = await this._hashHelper.hash(createUserDto.password);
    const result = this._repository.create({
      fullname: createUserDto.fullname,
      email: createUserDto.email,
      is_block: createUserDto.is_block,
      password_hash: hash,
      role: { id: 2 },
    });
    const savedUser = await this._repository.save(result);

    return {
      id: savedUser.id,
      email: savedUser.email,
      fullname: savedUser.fullname,
      is_block: savedUser.is_block,
    };
  }

  async validateCredentials(email: string, password: string) {
    const user = await this._repository.findOne({ where: { email } });
    if (!user || user.is_block) {
      return null;
    }

    const isValid = await this._hashHelper.isValidPassword(
      password,
      user.password_hash,
    );
    return isValid ? { id: user.id, email: user.email } : null;
  }

  async hasRole(userId: number, roleName: string): Promise<boolean> {
    const user = await this._repository.findOne({
      where: { id: userId },
      relations: { role: true },
    });

    return user?.role?.name === roleName;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
