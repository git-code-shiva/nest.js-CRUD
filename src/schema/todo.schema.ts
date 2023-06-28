import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: mongoose.Types.ObjectId;
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const todoSchema = SchemaFactory.createForClass(Todo);
