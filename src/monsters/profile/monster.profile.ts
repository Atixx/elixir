import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ShowMonsterDto } from '../dto/presenters/show-monsters.dto';
import { Monster } from '../schemas/monster.schema';

@Injectable()
export class MonsterProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Monster,
        ShowMonsterDto,
        forMember(
          (destination) => destination.goldBalance,
          mapFrom((source) => source.goldBalance.toString()),
        ),
        forMember(
          (destination) => destination.speed,
          mapFrom((source) => source.speed.toString()),
        ),
      );
    };
  }
}
