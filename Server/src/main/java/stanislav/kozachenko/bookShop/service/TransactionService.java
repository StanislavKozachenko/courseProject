package stanislav.kozachenko.bookShop.service;

import org.springframework.stereotype.Service;
import stanislav.kozachenko.bookShop.model.Book;
import stanislav.kozachenko.bookShop.model.Transaction;

import java.util.List;

public interface TransactionService {
    public Transaction saveTransaction(Transaction transaction);
    public Transaction findById(int id);
    public List<Transaction> getAllTransactions();
    public List<Transaction> findTransactionsByUserId(int userId);
    public Transaction updateTransaction(int id, Transaction newTransaction);
    public String deleteTransaction(int id);
}
