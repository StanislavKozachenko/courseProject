package stanislav.kozachenko.bookShop.service;

import stanislav.kozachenko.bookShop.model.Book;

import java.util.List;

public interface BookService {
    public void saveBook(Book book);
    public Book findById(int id);
    public List<Book> getAllBooks();
    public List<Book> getBooksByParams(int category, int page, String title, String sortBy);
    public Book updateBook(int id, Book newBook);
    public String deleteBook(int id);
 }
