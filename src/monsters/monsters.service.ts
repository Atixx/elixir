import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Monster } from './schemas/monster.schema';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { AddGoldDto } from './dto/add-gold.dto';
import { RemoveGoldDto } from './dto/remove-gold.dto';
import { NegativeBalanceError } from '../errors/types/negative-balance-error';
import { DatabaseError } from '../errors/types/database-error';
import { MONGO_ERR_CODES } from '../errors/constants';
import { DuplicateError } from '../errors/types/duplicate-error';

@Injectable()
export class MonstersService {
  constructor(
    @InjectModel(Monster.name) private monsterModel: Model<Monster>,
  ) {}

  async create(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    return this.monsterModel
      .create(createMonsterDto)
      .catch((err: Record<string, unknown>) => {
        if (err.code == MONGO_ERR_CODES.unique_violation) {
          throw new DuplicateError(err);
        } else {
          throw new DatabaseError(err);
        }
      });
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

  async addGold(addGold: AddGoldDto): Promise<Monster | null> {
    return this.monsterModel.findOneAndUpdate(
      { _id: addGold.id },
      {
        $inc: { goldBalance: addGold.increaseAmount },
      },
      { new: true },
    );
  }

  async removeGold(removeGold: RemoveGoldDto): Promise<Monster | null> {
    const monster = await this.monsterModel.findById(removeGold.id);
    if (!monster) {
      return null;
    }

    const decimalAmount = new Types.Decimal128(removeGold.decreaseAmount);

    // we need to do this to be able to do arithmetic
    // see: http://thecodebarbarian.com/a-nodejs-perspective-on-mongodb-34-decimal.html
    if (
      parseFloat(monster.goldBalance.toString()) <
      parseFloat(decimalAmount.toString())
    ) {
      throw new NegativeBalanceError({
        error: `negative balance not allowed, after operation reducing ${removeGold.decreaseAmount} from ${monster.goldBalance}`,
      });
    }

    return this.monsterModel.findOneAndUpdate(
      { _id: removeGold.id },
      {
        $inc: { goldBalance: (decimalAmount as any) * -1.0 },
      },
      { new: true },
    );
  }
}
