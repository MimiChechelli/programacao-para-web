import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { SessionGuard } from '../guards/session.guard';
import { CommentPostDto, PostDto } from './posts.dto';

@Controller('posts')
@UseGuards(SessionGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() body: PostDto, @Req() request) {
    const user_id = request.user_id;
    return this.postsService.create({ user_id, ...body });
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: PostDto, @Req() request) {
    const user_id = request.user_id;
    return this.postsService.update({ user_id, id, ...body });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request) {
    const user_id = request.user_id;
    return this.postsService.remove({ user_id, id });
  }

  @Post(':id/like')
  like(@Param('id') id: string, @Req() request) {
    const user_id = request.user_id;
    return this.postsService.likeUnlike({ user_id, post_id: id });
  }

  @Post(':id/comment')
  comment(
    @Param('id') id: string,
    @Body() body: CommentPostDto,
    @Req() request,
  ) {
    const user_id = request.user_id;
    return this.postsService.comment({ user_id, post_id: id, ...body });
  }
}
