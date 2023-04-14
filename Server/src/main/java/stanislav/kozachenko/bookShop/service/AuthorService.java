package stanislav.kozachenko.bookShop.service;

import stanislav.kozachenko.bookShop.model.Author;
import stanislav.kozachenko.bookShop.model.Book;

import java.util.List;

public interface AuthorService {
    public Author saveAuthor(Author author);
    public List<Author> getAllAuthors();
}
