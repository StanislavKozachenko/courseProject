package stanislav.kozachenko.bookShop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stanislav.kozachenko.bookShop.exception.OrderNotFoundException;
import stanislav.kozachenko.bookShop.model.Order;
import stanislav.kozachenko.bookShop.repository.OrderRepository;

import java.util.List;
@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order findById(int id) {
        return orderRepository.findById(id)
                .orElseThrow(()->new OrderNotFoundException(id));
    }

    @Override
    public List<Order> findOrdersByUserId(int userId) {
        return orderRepository.findOrdersByUserId(userId);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order updateOrder(int id, Order newOrder) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setOrderDate(newOrder.getOrderDate());
                    order.setTotal(newOrder.getTotal());
                    order.setCode(newOrder.getCode());
                    order.setUserId(newOrder.getUserId());
                    return orderRepository.save(order);
                }).orElseThrow(()->new OrderNotFoundException(id));
    }

    @Override
    public String deleteOrder(int id) {
        if(!orderRepository.existsById(id)){
            throw new OrderNotFoundException(id);
        }
        orderRepository.deleteById(id);
        return "Order with id "+id+"has been deleted successfully.";
    }
}
