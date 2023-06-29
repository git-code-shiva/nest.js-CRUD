import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ObjectId } from 'mongodb';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('createTodo')
  async create(@Body() createTodoDto: CreateTodoDto) {
    createTodoDto.userId = new ObjectId(createTodoDto.userId);
    return await this.todosService.create(createTodoDto);
  }

  @Get('getTodo')
  findAll(@Query('userId') userId: string) {
    if (userId) {
      return this.todosService.findByUserId(userId);
    } else {
      return this.todosService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id==> log', id);
    return this.todosService.findOne({ _id: id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
