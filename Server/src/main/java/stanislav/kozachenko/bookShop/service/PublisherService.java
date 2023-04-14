package stanislav.kozachenko.bookShop.service;

import org.springframework.stereotype.Service;
import stanislav.kozachenko.bookShop.model.Book;
import stanislav.kozachenko.bookShop.model.Publisher;

import java.util.List;
public interface PublisherService {
    public Publisher savePublisher(Publisher publisher);
    public List<Publisher> getAllPublishers();
}
