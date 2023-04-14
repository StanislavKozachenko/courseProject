package stanislav.kozachenko.bookShop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stanislav.kozachenko.bookShop.model.Author;
import stanislav.kozachenko.bookShop.service.AuthorService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/authors")
public class AuthorController {
    @Autowired
    private AuthorService authorService;

    @PostMapping("/add")
    public String add(@RequestBody Author author)
    {
        authorService.saveAuthor(author);
        return "New author is added";
    }

    @GetMapping("/all")
    public List<Author> getAllBooks()
    {
        return authorService.getAllAuthors();
    }
}