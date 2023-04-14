package stanislav.kozachenko.bookShop.service;

import stanislav.kozachenko.bookShop.model.Order;

import java.util.List;
public interface OrderService {
    public Order saveOrder(Order order);
    public Order findById(int id);
    public List<Order> getAllOrders();

    public List<Order> findOrdersByUserId(int userId);
    public Order updateOrder(int id, Order newUser);
    public String deleteOrder(int id);
}
