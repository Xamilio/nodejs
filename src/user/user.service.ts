import { Injectable } from '@nestjs/common';
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
    if (user == null) {
      const hash = await this._hashHelper.hash(createUserDto.password);
      const result = await this._repository.create({
        fullname: createUserDto.fullname,
        email: createUserDto.email,
        is_block: createUserDto.is_block,
        password_hash: hash,
      });
      console.log(await this._repository.save(result));
    }
    return 'This action adds a new user';
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
