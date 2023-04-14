package stanislav.kozachenko.bookShop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stanislav.kozachenko.bookShop.model.Publisher;
import stanislav.kozachenko.bookShop.repository.PublisherRepository;

import java.util.List;

@Service
public class PublisherServiceImpl implements PublisherService{
    @Autowired
    private PublisherRepository publisherRepository;

    @Override
    public Publisher savePublisher(Publisher publisher) {
        return publisherRepository.save(publisher);
    }

    @Override
    public List<Publisher> getAllPublishers() {
        return publisherRepository.findAll();
    }
}
