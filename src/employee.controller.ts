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

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeServices: EmployeeService) {}

  @Post()
  create(@Body() CreateEmployeeDto: CreateEmployeeDto) {
    return this.employeeServices.create(CreateEmployeeDto);
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
