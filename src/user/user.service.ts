import { User } from '@/schema/user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, GetUserDto } from '@/user/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDto) {
    const { userId } = user;

    const _user = await this.userModel.findById(userId)

    if (_user) {
      return {
        user: _user
      }
    }

    const refreshToken = this.generateRefreshToken(user.userId)

    const newUser = await this.userModel.create({
      _id: user.userId,
      username: user.username,
      profileUrl: user.profileUrl,
      bio: user.bio,
      favorite: user.favorite,
      authType: user.authType,
      links: user.links,
      interestTag: [],
      interestContent: [],
      markedContent: [],
      markedPost: [],
      likedPost: [],
      postCount: 0,
      bookCount: 0,
      thesisCount: 0,
      follower: 0,
      following: 0,
      rate: 0,
      refreshToken: refreshToken
    });

    await newUser.save();

    return {
      user: newUser
    }
  }

  async getLogin(userId: string) {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { refreshToken },
      { new: true },
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      userId: user._id,
      profileUrl: user.profileUrl,
      username: user.username,
      bio: user.bio,
      accessToken,
      refreshToken,
    };
  }

  async refresh(token: string, userId: string) {
    const refreshTokenInfo = await this.userModel.findOne({
      _id: userId,
      refreshToken: token,
    });

    if (!refreshTokenInfo)
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);

    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    refreshTokenInfo.refreshToken = refreshToken;

    await refreshTokenInfo.save();

    return { accessToken, refreshToken };
  }

  private generateAccessToken(userId: string) {
    const payload = { sub: userId, tokenType: 'access' };
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  private generateRefreshToken(userId: string) {
    const payload = { sub: userId, tokenType: 'refresh' };
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId)
  
    if (!user) {
      return null;
    }
    return user;
  }
}
