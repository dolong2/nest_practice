import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from 'src/service/posts/posts.service';
import { CreatePostReqDto, UpdatePostReqDto } from './dto/request-posts.dto';
import { PostListResDto, PostResDto } from './dto/response-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Body() createPostReqDto: CreatePostReqDto, @Req() req) {
    await this.postsService.createPost(createPostReqDto, req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getOnePost(@Param('id') id: number): Promise<PostResDto> {
    return await this.postsService.getOnePost(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllPosts(): Promise<PostListResDto> {
    return await this.postsService.getAllPosts();
  }

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  async getMyAllPosts(@Req() req): Promise<PostListResDto> {
    return await this.postsService.getAllPostsByUser(req.user);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number, @Req() req) {
    this.postsService.deletePost(id, req.user);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Req() req,
    @Body() updatePostReqDto: UpdatePostReqDto,
  ) {
    await this.postsService.updatePost(id, req.user, updatePostReqDto);
  }
}
