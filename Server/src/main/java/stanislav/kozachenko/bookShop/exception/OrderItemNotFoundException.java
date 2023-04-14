package stanislav.kozachenko.bookShop.exception;

public class OrderItemNotFoundException extends  RuntimeException{
    public OrderItemNotFoundException(int id){
        super("Could not found the order item with id " + id);
    }
}
