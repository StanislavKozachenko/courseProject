package stanislav.kozachenko.bookShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stanislav.kozachenko.bookShop.model.Publisher;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Integer> {
}
