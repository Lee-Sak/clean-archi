import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
  ParseIntPipe,
  DefaultValuePipe,
  Put,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Dexter, Person } from '../test';
import { CreateUserCommand } from '../application/command/create.user.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserInfoQuery } from '../application/query/get.user.info.query';
// 컨트롤러 레이어에선 클라이언트가 보낸
// 데이터를 dto를 통해 검증(필요없는 데이터, 누락된 데이터)
// 필요없는 데이터는 받지 않고, 누락된 데이터는 유효성 검사를 통해 체크
// 서비스(비즈니스)레이어로 보내준다.

@Controller('users')
export class UsersController {
  constructor(
    @Inject('Person') private p: Person,
    private readonly usersService: UsersService,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('test')
  async test(@Body() dto) {
    console.log(dto);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const getUserInfoQuery = new GetUserInfoQuery(id);

    return this.queryBus.execute(getUserInfoQuery);
    //return await this.usersService.readUser(id);
  }

  @Get()
  async getMany(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);
  }

  @Post()
  async postOne(@Body() dto: CreateUserDto): Promise<void> {
    const { email, password, name } = dto;
    const command = new CreateUserCommand(name, email, password);
    return this.commandBus.execute(command);
    //await this.usersService.createUser(email, password, name);
  }

  // 부분수정, 유저하나
  @Patch(':id')
  async patchOne(@Param('id') id: string, @Body() dto) {
    return;
  }

  // 부분수정, 유저다수
  @Patch()
  async patchMany(@Query() ids: string, @Body() dto) {
    return;
  }

  // 전체수정, 유저하나
  @Put(':id')
  async putOne(@Param('id') id: string, @Body() dto) {
    return;
  }

  // 전체수정, 유저다수
  @Put()
  async putMany(@Query() ids: string, @Body() dto) {
    return;
  }

  //
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return;
  }

  @Delete()
  async deleteMany(@Query() ids: string) {
    return;
  }
}

/* 객체의 관리(라이프사이클)를 직접
  private person: Person;

  constructor(private readonly usersService: UsersService) {
    this.person = new Dexter();
  }
  */

/* 객체의 관리를 IOC에게 넘김 
  IOC: 객체의 라이프 사이클에 관여하지 않고, 자신의 생성자에 주어지는 객체를 가져다 쓰게끔 해주는 것
  DI: IoC 컨테이너가 직접 객체의 생명주기를 관리하는 방식
  */
