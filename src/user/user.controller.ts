import { Public } from '@/common/decorator/public.decorator';
import { Body, Controller, Post, Headers, Get, Param } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { CreateUserDto, LoginUserDto } from '@/user/dto/user.dto';
import { IUserAuth, User } from '@/common/decorator/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signup')
  create(@Body() user: CreateUserDto) {
    return this.userService.createUser(user)
  }

  @Public()
  @Post('signin')
  login(@Body() user: LoginUserDto) {
    return this.userService.getLogin(user.userId);
  }

  @Public()
  @Post('refresh')
  async refresh(
    @Headers('authorization') authorization,
    @User() user: IUserAuth,
  ) {
    const token = /Bearer\s(.+)/.exec(authorization)[1];
    const { accessToken, refreshToken } = await this.userService.refresh(
      token,
      user.userId,
    );
    return { accessToken, refreshToken };
  }

  @Get(':id')
  getUserById(
    @Param() user: IUserAuth,
  ) {
    return this.userService.getUserById(user.userId)
  }
}
