package stanislav.kozachenko.bookShop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stanislav.kozachenko.bookShop.consts.PathConst;
import stanislav.kozachenko.bookShop.exception.BookNotFoundException;
import stanislav.kozachenko.bookShop.model.Book;
import stanislav.kozachenko.bookShop.repository.BookRepository;

import java.util.*;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public void saveBook(Book book) {
        bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    @Override
    public List<Book> getBooksByParams(int category, int page, String title, String sortBy) {
        List<Book> buffer;
        List<Book> result = new ArrayList<>();
        if(category == 0 && Objects.equals(title, "")){
            buffer = bookRepository.findAll();
        }
        else {
            if (category == 0) {
                buffer = bookRepository.findByTitle(title);
            } else {
                if (Objects.equals(title, "")) {
                    buffer = bookRepository.findByCategory(category);
                } else {
                    buffer = bookRepository.findByParams(category, title);
                }
            }
        }
        switch (sortBy) {
            case "title" -> buffer.sort(Comparator.comparing(Book::getTitle));
            case "rating" -> buffer.sort(Comparator.comparingInt(Book::getRating).reversed());
            case "price" -> buffer.sort(Comparator.comparingDouble(Book::getPrice));
            default -> {
            }
        }
        int limit = PathConst.COUNT_PER_PAGE;
        for(int i = limit * (page - 1); i < limit * (page - 1) + limit; i++ ){
            try {
                result.add(buffer.get(i));
            }
            catch (Exception e)
            {
                return result;
            }
        }
        return result;
    }

    @Override
    public Book findById(int id) {
        return bookRepository.findById(id)
                .orElseThrow(()->new BookNotFoundException(id));
    }

    @Override
    public Book updateBook(int id, Book newBook) {
        return bookRepository.findById(id)
                .map(book -> {
                    book.setTitle(newBook.getTitle());
                    book.setCategory(newBook.getCategory());
                    book.setTypes(newBook.getTypes());
                    book.setPrice(newBook.getPrice());
                    book.setAuthorId(newBook.getAuthorId());
                    book.setPublicationYear(newBook.getPublicationYear());
                    book.setPublisherId(newBook.getPublisherId());
                    book.setRating(newBook.getRating());
                    book.setImageUrl(newBook.getImageUrl());
                    book.setSizes(newBook.getSizes());
                    return bookRepository.save(book);
                }).orElseThrow(()->new BookNotFoundException(id));
    }

    @Override
    public String deleteBook(int id) {
        if(!bookRepository.existsById(id)){
            throw new BookNotFoundException(id);
        }
        bookRepository.deleteById(id);
        return "Book with id "+id+"has been deleted successfully.";
    }

}
