import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeServices: EmployeeService) {}

  @Post('register')
  async create(@Body() CreateEmployeeDto: CreateEmployeeDto) {
    try {
      const isExist = await this.employeeServices.findOne(
        CreateEmployeeDto.email,
      );

      if (isExist) {
        return 'Email already exists';
      }

      const hashedPass = await bcrypt.hash(CreateEmployeeDto.password, 10);
      const hashedEmpDto: CreateEmployeeDto = {
        ...CreateEmployeeDto,
        password: hashedPass,
      };

      return await this.employeeServices.create(hashedEmpDto);
    } catch (error) {
      return error.message;
    }
  }

  @Post('login')
  async login(@Body() loginDto: loginDto) {
    try {
      const result = await this.employeeServices.login(loginDto);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  findAll() {
    return this.employeeServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeServices.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeServices.update(id, UpdateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeServices.remove(id);
  }
}
