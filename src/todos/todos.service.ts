import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from '../schema/todo.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<TodoDocument>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    const createdTodo = new this.todoModel(createTodoDto);
    return await createdTodo.save();
  }

  async findAll(): Promise<TodoDocument[]> {
    return await this.todoModel.find().exec();
  }

  async findOne(type: any): Promise<Todo> {
    return this.todoModel.findOne(type).exec();
  }

  async findByUserId(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ userId }).exec();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Todo> {
    return await this.todoModel.findByIdAndRemove(id).exec();
  }
}
