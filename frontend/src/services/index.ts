import axios, { AxiosResponse } from 'axios';
import { env } from '../env';

export type Token = {
  token: string;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: User;
  Likes: Like[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export type Like = {
  id: string;
  user_id: string;
  post_id: string;
  created_at: Date;
  updated_at: Date;
};

export class Api {
  api: any;

  constructor() {
    this.api = axios.create({
      baseURL: env.VITE_API_URL,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
  }

  async login(email: string, password: string): Promise<AxiosResponse<Token>> {
    return this.api.post('/session', {
      email,
      password,
    });
  }

  async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<AxiosResponse> {
    return this.api.post('/signup', {
      name,
      email,
      password,
    });
  }

  async getPosts(): Promise<AxiosResponse<Post[]>> {
    return this.api.get('/posts');
  }

  async likePost(id: string): Promise<AxiosResponse> {
    return this.api.post(`/posts/${id}/like`);
  }

  async createPost(
    title: string,
    description: string,
    content: string,
  ): Promise<AxiosResponse> {
    return this.api.post('/posts', {
      title,
      description,
      content,
    });
  }
}
