package stanislav.kozachenko.bookShop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stanislav.kozachenko.bookShop.exception.OrderItemNotFoundException;
import stanislav.kozachenko.bookShop.exception.OrderNotFoundException;
import stanislav.kozachenko.bookShop.model.Order;
import stanislav.kozachenko.bookShop.model.OrderItem;
import stanislav.kozachenko.bookShop.repository.OrderItemRepository;

import java.util.List;
@Service
public class OrderItemServiceImpl implements OrderItemService{

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public OrderItem findById(int id) {
        return orderItemRepository.findById(id)
                .orElseThrow(()->new OrderItemNotFoundException(id));
    }

    @Override
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    @Override
    public OrderItem updateOrderItem(int id, OrderItem newOrderItem) {
        return orderItemRepository.findById(id)
                .map(orderItem-> {
                    orderItem.setOrderId(newOrderItem.getOrderId());
                    orderItem.setBookId(newOrderItem.getBookId());
                    return orderItemRepository.save(orderItem);
                }).orElseThrow(()->new OrderItemNotFoundException(id));
    }

    @Override
    public String deleteOrderItem(int id) {
        if(!orderItemRepository.existsById(id)){
            throw new OrderItemNotFoundException(id);
        }
        orderItemRepository.deleteById(id);
        return "Order item with id "+id+"has been deleted successfully.";
    }
}
