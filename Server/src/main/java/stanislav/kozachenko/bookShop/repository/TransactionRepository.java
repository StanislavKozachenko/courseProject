package stanislav.kozachenko.bookShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import stanislav.kozachenko.bookShop.model.Transaction;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    @Query("select transaction FROM Transaction transaction where transaction.userId =:userId")
    public List<Transaction> findTransactionsByUserId(@Param("userId") int userId);
}
