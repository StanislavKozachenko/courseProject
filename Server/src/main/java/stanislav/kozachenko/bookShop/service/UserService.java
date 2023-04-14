package stanislav.kozachenko.bookShop.service;

import stanislav.kozachenko.bookShop.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public User findById(int id);
    public List<User> getAllUsers();
    public User updateUser(int id, User newUser);
    public String deleteUser(int id);
}
