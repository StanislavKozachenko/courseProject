package stanislav.kozachenko.bookShop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stanislav.kozachenko.bookShop.model.Order;
import stanislav.kozachenko.bookShop.model.OrderItem;
import stanislav.kozachenko.bookShop.service.OrderItemService;
import stanislav.kozachenko.bookShop.service.OrderService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/orderItems")
public class OrderItemController {
    @Autowired
    private OrderItemService orderItemService;

    @PostMapping("/add")
    public String add(@RequestBody OrderItem orderItem)
    {
        orderItemService.saveOrderItem(orderItem);
        return "New order item is added";
    }
    @GetMapping("/all")
    public List<OrderItem> getAllOrders()
    {
        return orderItemService.getAllOrderItems();
    }

    @GetMapping("/{id}")
    public OrderItem findById(@PathVariable int id) {return orderItemService.findById(id);}

    @PutMapping("/{id}")
    public OrderItem updateOrder(@RequestBody OrderItem newOrderItem, @PathVariable int id){
        return orderItemService.updateOrderItem(id, newOrderItem);
    }
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable int id){
        return orderItemService.deleteOrderItem(id);
    }
}
