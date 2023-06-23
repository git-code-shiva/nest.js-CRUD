import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop()
  FirstName: string;

  @Prop()
  LastName: string;

  @Prop()
  Designation: string;

  @Prop()
  Email: string;
}

export const employeeSchema = SchemaFactory.createForClass(Employee);
