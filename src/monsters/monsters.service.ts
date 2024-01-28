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

  async findOne(id: string): Promise<Monster | null> {
    return this.monsterModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateMonsterDto: UpdateMonsterDto) {
    return this.monsterModel.findOneAndUpdate({ _id: id }, updateMonsterDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Monster | null> {
    const deletedMonster = await this.monsterModel
      .findByIdAndDelete({ _id: id })
      .exec();

    return deletedMonster;
  }
}
