package stanislav.kozachenko.bookShop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stanislav.kozachenko.bookShop.model.User;
import stanislav.kozachenko.bookShop.service.UserService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody User user)
    {
        userService.saveUser(user);
        return "New user is added";
    }
    @GetMapping("/{id}")
    public User findById(@PathVariable int id) {return userService.findById(id);}

    @GetMapping("/all")
    public List<User> getAllUsers()
    {
        return userService.getAllUsers();
    }

    @PutMapping("/{id}")
    public User updateUser(@RequestBody User newUser, @PathVariable int id){
        return userService.updateUser(id, newUser);
    }
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id){
        return userService.deleteUser(id);
    }
}
