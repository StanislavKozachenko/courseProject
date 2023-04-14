package stanislav.kozachenko.bookShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import stanislav.kozachenko.bookShop.model.Book;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("select book FROM Book book where book.category =:categoryId")
    public List<Book> findByCategory(@Param("categoryId") int categoryId);

    @Query("select book FROM Book book where book.title like %:title%")
    public List<Book> findByTitle(@Param("title") String title);

    @Query("select book FROM Book book where book.category =:categoryId and book.title like %:title%")
    public List<Book> findByParams(@Param("categoryId") int categoryId, @Param("title") String title);
}
