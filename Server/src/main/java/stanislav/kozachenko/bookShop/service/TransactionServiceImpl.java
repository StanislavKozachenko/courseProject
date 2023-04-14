package stanislav.kozachenko.bookShop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stanislav.kozachenko.bookShop.exception.TransactionNotFoundException;
import stanislav.kozachenko.bookShop.model.Transaction;
import stanislav.kozachenko.bookShop.repository.TransactionRepository;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService{

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction findById(int id) {
        return transactionRepository.findById(id)
                .orElseThrow(()->new TransactionNotFoundException(id));
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction updateTransaction(int id, Transaction newTransaction) {
        return transactionRepository.findById(id)
                .map(transaction -> {
                    transaction.setCreatedAt(newTransaction.getCreatedAt());
                    transaction.setOrderId(newTransaction.getOrderId());
                    transaction.setUserId(newTransaction.getUserId());
                    return transactionRepository.save(transaction);
                }).orElseThrow(()->new TransactionNotFoundException(id));
    }

    @Override
    public String deleteTransaction(int id) {
        if(!transactionRepository.existsById(id)){
            throw new TransactionNotFoundException(id);
        }
        transactionRepository.deleteById(id);
        return "Transaction with id "+id+"has been deleted successfully.";
    }

    @Override
    public List<Transaction> findTransactionsByUserId(int userId) {
        return transactionRepository.findTransactionsByUserId(userId);
    }
}
