import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './schema/employee.schema';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    // const isExist = await this.employeeModel.find({
    //   email: createEmployeeDto.email,
    // });

    // if (isExist) {
    //   return 'already exist';
    // }

    const createdEmployee = new this.employeeModel(createEmployeeDto);
    return createdEmployee.save();
  }

  async login(loginDto: loginDto): Promise<{ employee: any; token: string }> {
    const { email, password } = loginDto;

    const employee = await this.employeeModel.findOne({ email: email }).exec();
    if (!employee) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    const passwordMatch = await bcrypt.compare(password, employee.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    // const jwtSecret = this.configService.get<string>('JWT_SECRET');
    // console.log(process.env.SECRET_KEY);

    const token = jwt.sign({ email: employee.email }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    return { employee, token };
  }

  async findAll(): Promise<EmployeeDocument[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(type: any): Promise<Employee> {
    return this.employeeModel.findOne({ type }).exec();
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Employee> {
    return this.employeeModel.findByIdAndRemove(id).exec();
  }
}
