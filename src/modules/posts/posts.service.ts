import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentPostDto, PostDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  // Cria postagem a partir das informações no BODY + ID do usuário
  // que vem do Token decodificado pelo Session Guard
  async create({ user_id, title, description, content }: PostDto) {
    if (!title || !description || !content) {
      throw new HttpException(
        'Dados inválidos, necessário enviar {title}, {description}, {content}',
        400,
      );
    }

    return await this.prismaService.posts.create({
      data: {
        user_id,
        title,
        description,
        content,
      },
    });
  }

  // Publico, listagem de postagens que qualquer um pode ver
  async findAll() {
    return await this.prismaService.posts.findMany();
  }

  // Publico, visualização de uma postagem que qualquer um pode ver
  // Include Comments e Likes para trazer informações relacionadas
  // Include = left join
  async findOne(id: string) {
    const post = await this.prismaService.posts.findUnique({
      where: { id },
      include: {
        Comments: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        Likes: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      throw new HttpException('Postagem não encontrada', 404);
    }

    return post;
  }

  // Atualiza postagem a partir das informações no BODY + ID do usuário
  // que vem do Token decodificado pelo Session Guard
  async update({ user_id, id, title, description, content }: PostDto) {
    if (!title || !description || !content) {
      throw new HttpException(
        'Dados inválidos, necessário enviar {title}, {description}, {content}',
        400,
      );
    }

    const post = await this.prismaService.posts.findUnique({
      where: { id, user_id },
    });

    if (!post) {
      throw new HttpException('Postagem não encontrada', 404);
    }

    return await this.prismaService.posts.update({
      where: { id, user_id },
      data: { title, description, content },
    });
  }

  // Remove postagem a partir do ID da postagem e do ID do usuário
  async remove({ user_id, id }) {
    const post = await this.prismaService.posts.findUnique({
      where: { id, user_id },
    });

    if (!post) {
      throw new HttpException('Postagem não encontrada', 404);
    }

    return await this.prismaService.posts.delete({ where: { id, user_id } });
  }

  // Like ou Unlike em uma postagem a partir do ID da postagem e do ID do usuário
  async likeUnlike({ user_id, post_id }) {
    const like = await this.prismaService.likes.findFirst({
      where: { user_id, post_id },
    });

    if (like) {
      return await this.prismaService.likes.delete({ where: { id: like.id } });
    }

    return await this.prismaService.likes.create({
      data: {
        user_id,
        post_id,
      },
    });
  }

  // Comenta em uma postagem a partir do ID da postagem e do ID do usuário
  async comment({ user_id, post_id, content }: CommentPostDto) {
    if (!content) {
      throw new HttpException(
        'Dados inválidos, necessário enviar {content}',
        400,
      );
    }

    return await this.prismaService.comments.create({
      data: {
        user_id,
        post_id,
        content,
      },
    });
  }
}
