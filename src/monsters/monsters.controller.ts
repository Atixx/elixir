import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';
import { IsObjectIdPipe } from 'nestjs-object-id';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../users/role.enum';
import { Roles } from '../users/roles.decorator';
import { RolesGuard } from '../users/roles.guard';
import { AddGoldDto } from './dto/add-gold.dto';
import { GoldChangeDto } from './dto/inputs/gold-change.dto';
import { RemoveGoldDto } from './dto/remove-gold.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { Monster } from './schemas/monster.schema';
import { ShowMonsterDto } from './dto/presenters/show-monsters.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const NOT_FOUND_ERROR_MSG = 'Monster not found';

@ApiTags('monsters')
@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Post()
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(MapInterceptor(Monster, ShowMonsterDto))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monstersService.create(createMonsterDto);
  }

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(MapInterceptor(Monster, ShowMonsterDto, { isArray: true }))
  findAll() {
    return this.monstersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Roles(Role.Admin)
  @UseInterceptors(
    MapInterceptor(Monster, ShowMonsterDto),
    new NotFoundInterceptor(NOT_FOUND_ERROR_MSG),
  )
  async findOne(@Param('id', IsObjectIdPipe) id: string) {
    const model = await this.monstersService.findOne(id);
    if (!model) return undefined;
    return model;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(
    MapInterceptor(Monster, ShowMonsterDto),
    new NotFoundInterceptor(NOT_FOUND_ERROR_MSG),
  )
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async update(
    @Param('id', IsObjectIdPipe) id: string,
    @Body() updateMonsterDto: UpdateMonsterDto,
  ) {
    const model = await this.monstersService.update(id, updateMonsterDto);
    if (!model) return undefined;
    return model;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(
    MapInterceptor(Monster, ShowMonsterDto),
    new NotFoundInterceptor(NOT_FOUND_ERROR_MSG),
  )
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async remove(@Param('id', IsObjectIdPipe) id: string) {
    const model = await this.monstersService.remove(id);
    if (!model) return undefined;
    return model;
  }

  @Post(':id/add_gold')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CEO, Role.Admin)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(
    MapInterceptor(Monster, ShowMonsterDto),
    new NotFoundInterceptor(NOT_FOUND_ERROR_MSG),
  )
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async addGold(
    @Param('id', IsObjectIdPipe) id: string,
    @Body() increaseDto: GoldChangeDto,
  ) {
    const addGold: AddGoldDto = {
      id,
      increaseAmount: parseFloat(increaseDto.amount),
    };

    const model = await this.monstersService.addGold(addGold);
    if (!model) return undefined;
    return model;
  }

  @Post(':id/remove_gold')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(
    MapInterceptor(Monster, ShowMonsterDto),
    new NotFoundInterceptor(NOT_FOUND_ERROR_MSG),
  )
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async removeGold(
    @Param('id', IsObjectIdPipe) id: string,
    @Body() decreaseDto: GoldChangeDto,
  ) {
    const removeGold: RemoveGoldDto = {
      id,
      decreaseAmount: decreaseDto.amount,
    };

    const model = await this.monstersService.removeGold(removeGold);
    if (!model) return undefined;
    return model;
  }
}
