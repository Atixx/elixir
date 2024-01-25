import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Monster } from './schemas/monster.schema';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';

@Injectable()
export class MonstersService {
  constructor(
    @InjectModel(Monster.name) private monsterModel: Model<Monster>,
  ) {}

  async create(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    const createdMonster = await this.monsterModel.create(createMonsterDto);
    return createdMonster;
  }

  async findAll(): Promise<Monster[]> {
    return this.monsterModel.find().exec();
  }

  async findOne(id: number): Promise<Monster | null> {
    return this.monsterModel.findOne({ _id: id }).exec();
  }

  // TODO: implement
  async update(id: number, updateMonsterDto: UpdateMonsterDto) {
    return `This action updates a #${id} monster`;
  }

  async remove(id: number): Promise<Monster | null> {
    const deletedMonster = await this.monsterModel
      .findByIdAndDelete({ _id: id })
      .exec();

    return deletedMonster;
  }
}
