package stanislav.kozachenko.bookShop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stanislav.kozachenko.bookShop.model.Book;
import stanislav.kozachenko.bookShop.service.BookService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @PostMapping("/add")
    public String add(@RequestBody Book book)
    {
        bookService.saveBook(book);
        return "New book is added";
    }
    @GetMapping("/")
    public List<Book> getBooksByParams(@RequestParam int category,
                                       @RequestParam int page,
                                       @RequestParam(defaultValue = "") String title,
                                       @RequestParam(defaultValue = "rating") String sortBy)
    {return bookService.getBooksByParams(category, page, title, sortBy);}

    @GetMapping("/all")
    public List<Book> getAllBooks()
    {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book findById(@PathVariable int id) {return bookService.findById(id);}

    @PutMapping("/{id}")
    public Book updateBook(@RequestBody Book newBook, @PathVariable int id){
        return bookService.updateBook(id, newBook);
    }
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable int id){
        return bookService.deleteBook(id);
    }
}
