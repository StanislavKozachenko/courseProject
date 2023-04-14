package stanislav.kozachenko.bookShop.service;

import org.springframework.stereotype.Service;
import stanislav.kozachenko.bookShop.model.OrderItem;

import java.util.List;
public interface OrderItemService {
    public OrderItem saveOrderItem(OrderItem orderItem);
    public OrderItem findById(int id);
    public List<OrderItem> getAllOrderItems();
    public OrderItem updateOrderItem(int id, OrderItem newOrderItem);
    public String deleteOrderItem(int id);
}
