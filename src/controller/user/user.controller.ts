import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    console.log('>>>>>>>>>>>>> ');
    console.log(createUserDto);
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.OK,
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created! Error: ' + err.message,
        error: 'Bad Request',
      });
    }
  }

  @Put('/:cardNumber')
  async updateUser(
    @Res() response,
    @Param('cardNumber') cardNumber: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.userService.updateUser(
        cardNumber,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'User has been successfully updated',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:cardNumber')
  async getUser(@Res() response, @Param('cardNumber') cardNumber: string) {
    try {
      const existingUser = await this.userService.getUser(cardNumber);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'User found successfully',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  //remove permanent
  @Delete('/:cardNumber')
  async deleteUser(@Res() response, @Param('cardNumber') cardNumber: string) {
    try {
      const deletedUser = await this.userService.deleteUser(cardNumber);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  async getUserActiveProfile(
    @Res() response,
    @Param('cardNumber') cardNumber: string,
  ) {
    try {
      const isActive = await this.userService.isActiveProfile(cardNumber);
      return response.status(HttpStatus.OK).json({
        isActive,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
