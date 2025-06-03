import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Not } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async findAll(): Promise<any[]> {
    const newsList = await this.newsRepository.find({
      where: { isActive: true },
      order: { date: 'DESC', createdAt: 'DESC' },
      select: [
        'id', 'title', 'category', 'date', 'author', 'views', 'mainImage', 'description', 'images', 'tags', 'content', 'isActive', 'createdAt', 'updatedAt'
      ],
    });
    return newsList.map(news => {
      let imagesArr: string[] = [];
      if (news.images && news.images.trim() !== '') {
        imagesArr = news.images.split(',');
      } else if (news.mainImage) {
        imagesArr = [news.mainImage];
      }
      return {
        ...news,
        images: imagesArr,
      };
    });
  }

  async findOne(id: number): Promise<News> {
    const newsItem = await this.newsRepository.findOne({
      where: { id, isActive: true },
    });
    if (!newsItem) {
      throw new NotFoundException(`News item with ID ${id} not found`);
    }
    // Increment views count (optional, can be done here or in controller)
    newsItem.views++;
    await this.newsRepository.save(newsItem);

    return newsItem;
  }

  // Phương thức tạo bài viết mới (Admin)
  async create(newsData: Partial<News>): Promise<News> {
    const newsItem = this.newsRepository.create(newsData);
    return this.newsRepository.save(newsItem);
  }

  // Phương thức cập nhật bài viết (Admin)
  async update(id: number, newsData: Partial<News>): Promise<News> {
    const newsItem = await this.findOne(id);
    Object.assign(newsItem, newsData);
    return this.newsRepository.save(newsItem);
  }

  // Phương thức xóa (Admin - soft delete)
  async remove(id: number): Promise<void> {
    const newsItem = await this.findOne(id);
    newsItem.isActive = false;
    await this.newsRepository.save(newsItem);
  }

  // Logic để tìm tin tức liên quan (có thể cần tùy chỉnh)
  async findRelatedNews(currentNewsId: number, category: string, limit = 3): Promise<News[]> {
    const related = await this.newsRepository.find({
      where: { 
        isActive: true, 
        category, 
        id: Not(currentNewsId)
      },
      order: { date: 'DESC', createdAt: 'DESC' },
      take: limit,
      select: ['id', 'title', 'mainImage', 'date'],
    });
    return related.map(news => ({
      ...news,
      image: news.mainImage,
    }));
  }
}
