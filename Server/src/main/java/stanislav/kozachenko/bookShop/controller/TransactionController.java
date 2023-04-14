package stanislav.kozachenko.bookShop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stanislav.kozachenko.bookShop.model.Book;
import stanislav.kozachenko.bookShop.model.Transaction;
import stanislav.kozachenko.bookShop.service.TransactionService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/add")
    public String add(@RequestBody Transaction transaction)
    {
        transactionService.saveTransaction(transaction);
        return "New transaction is added";
    }
//    @GetMapping("/")
//    public List<Book> getBooksByParams(@RequestParam int category,
//                                       @RequestParam int page,
//                                       @RequestParam(defaultValue = "") String title,
//                                       @RequestParam(defaultValue = "rating") String sortBy)
//    {return bookService.getBooksByParams(category, page, title, sortBy);}
    @GetMapping("/")
    public List<Transaction> getTransactionsByUserId(@RequestParam int userId)
    {return transactionService.findTransactionsByUserId(userId);}
    @GetMapping("/all")
    public List<Transaction> getAllTransactions()
    {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public Transaction findById(@PathVariable int id) {return transactionService.findById(id);}

    @PutMapping("/{id}")
    public Transaction updateTransaction(@RequestBody Transaction newTransaction, @PathVariable int id){
        return transactionService.updateTransaction(id, newTransaction);
    }
    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable int id){
        return transactionService.deleteTransaction(id);
    }
}
