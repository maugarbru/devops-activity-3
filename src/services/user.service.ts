import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable({
  scope: Scope.DEFAULT,
})
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }
  createUser(user: User) {
    return this.userRepository.save(user);
  }
}

//Servicio de usuario
