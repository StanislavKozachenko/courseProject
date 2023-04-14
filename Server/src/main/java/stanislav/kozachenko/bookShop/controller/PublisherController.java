package stanislav.kozachenko.bookShop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stanislav.kozachenko.bookShop.model.Publisher;
import stanislav.kozachenko.bookShop.service.PublisherService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/publishers")
public class PublisherController {
    @Autowired
    private PublisherService publisherService;

    @PostMapping("/add")
    public String add(@RequestBody Publisher publisher)
    {
        publisherService.savePublisher(publisher);
        return "New publisher is added";
    }
    @GetMapping("/all")
    public List<Publisher> getAllBooks()
    {
        return publisherService.getAllPublishers();
    }
}