'use strict'

const Book = use('App/Models/Book')
class BookController {
  async index ({response}) {
    let books = await Book.all()

    return response.json(books)
  }

  async show ({params, response}) {
    const book = await Book.find(params.id)

    return response.json(book)
  }

  async store ({request, response}) {
    const bookInfo = request.only(['title', 'isbn', 'publisher_name', 'author_name'])

    const book = new Book()
    book.title = bookInfo.title
    book.isbn = bookInfo.isbn
    book.publisher_name = bookInfo.publisher_name
    book.author_name = bookInfo.author_name

    await book.save()

    return response.status(201).json(book)
  }

  async update ({params, request, response}) {
    const bookInfo = request.only(['title', 'isbn', 'publisher_name', 'author_name'])

    const book = await Book.find(params.id)
    if (!book) {
      return response.status(404).json({data: 'Resource not found'})
    }
    book.title = bookInfo.title
    book.isbn = bookInfo.isbn
    book.publisher_name = bookInfo.publisher_name
    book.author_name = bookInfo.author_name

    await book.save()

    return response.status(200).json(book)
  }

  async delete ({params, response}) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.status(404).json({data: 'Resource not found'})
    }
    await book.delete()

    return response.status(204).json(null)
  }
}

module.exports = BookController
