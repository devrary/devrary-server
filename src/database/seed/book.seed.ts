import { Book } from "@/entity/book.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class BookSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const repository = dataSource.getRepository(Book);

    repository.insert({
      isbn: '978-3-16-148410-0',
      title: 'The Book of Life',
      description: 'A book about life',
      publisher: 'Life Publisher',
    })
  }
}