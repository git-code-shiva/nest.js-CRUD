// update-employee.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  // Additional properties that can be updated, if needed
  // For example:
  // designation: string;
}
