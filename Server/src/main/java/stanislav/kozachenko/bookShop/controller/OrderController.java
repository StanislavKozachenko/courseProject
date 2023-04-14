package stanislav.kozachenko.bookShop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stanislav.kozachenko.bookShop.model.Order;
import stanislav.kozachenko.bookShop.service.OrderService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public Order add(@RequestBody Order order)
    {
        return orderService.saveOrder(order);
    }

    @GetMapping("/")
    public List<Order> getOrdersByUserId(@RequestParam int userId)
    {return orderService.findOrdersByUserId(userId);}

    @GetMapping("/all")
    public List<Order> getAllOrders()
    {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order findById(@PathVariable int id) {return orderService.findById(id);}

    @PutMapping("/{id}")
    public Order updateOrder(@RequestBody Order newOrder, @PathVariable int id){
        return orderService.updateOrder(id, newOrder);
    }
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable int id){
        return orderService.deleteOrder(id);
    }
}
