package stanislav.kozachenko.bookShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stanislav.kozachenko.bookShop.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
