package stanislav.kozachenko.bookShop.exception;

public class TransactionNotFoundException extends RuntimeException{
    public TransactionNotFoundException(int id){
        super("Could not found the transaction with id " + id);
    }
}
