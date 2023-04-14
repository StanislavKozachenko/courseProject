package stanislav.kozachenko.bookShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import stanislav.kozachenko.bookShop.model.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {
}
