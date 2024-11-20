import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  user_id: string;
  id: string;

  @ApiProperty({
    title: 'Título',
    description: 'Título do post',
    type: String,
    example: 'Título de exemplo',
  })
  title: string;

  @ApiProperty({
    title: 'Description',
    description: 'Description do post',
    type: String,
    example: 'Description de exemplo',
  })
  description: string;

  @ApiProperty({
    title: 'Content',
    description: 'Content do post',
    type: String,
    example: 'Content de exemplo',
  })
  content: string;
}

export class CommentPostDto {
  user_id: string;
  post_id: string;

  @ApiProperty({
    title: 'Content',
    description: 'Content do post',
    type: String,
    example: 'Content de exemplo',
  })
  content: string;
}
