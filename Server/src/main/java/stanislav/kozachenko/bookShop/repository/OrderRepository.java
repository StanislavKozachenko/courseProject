package stanislav.kozachenko.bookShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import stanislav.kozachenko.bookShop.model.Order;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("select order FROM Order order where order.userId =:userId")
    public List<Order> findOrdersByUserId(@Param("userId") int userId);
}
