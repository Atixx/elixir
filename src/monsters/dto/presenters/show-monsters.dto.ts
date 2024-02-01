import { AutoMap } from '@automapper/classes';

export class ShowMonsterDto {
  @AutoMap()
  id: string;
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  title: string;
  @AutoMap()
  gender: string;
  @AutoMap()
  description: string;
  @AutoMap()
  nationalities: string[];
  @AutoMap()
  image_url: string;

  goldBalance: string;

  speed: string;
}
