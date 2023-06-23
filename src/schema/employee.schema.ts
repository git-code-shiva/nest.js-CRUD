import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  designation: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const employeeSchema = SchemaFactory.createForClass(Employee);
