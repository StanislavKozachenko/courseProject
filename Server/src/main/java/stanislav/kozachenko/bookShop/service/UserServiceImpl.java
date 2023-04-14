package stanislav.kozachenko.bookShop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stanislav.kozachenko.bookShop.exception.UserNotFoundException;
import stanislav.kozachenko.bookShop.model.User;
import stanislav.kozachenko.bookShop.repository.UserRepository;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(int id, User newUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setRegisteredAt(newUser.getRegisteredAt());
                    user.setEmail(newUser.getEmail());
                    user.setFirstName(newUser.getFirstName());
                    user.setRole(newUser.getRole());
                    user.setLastName(newUser.getLastName());
                    user.setPasswordHash(newUser.getPasswordHash());
                    return userRepository.save(user);
                }).orElseThrow(()->new UserNotFoundException(id));
    }

    @Override
    public String deleteUser(int id) {
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id "+id+"has been deleted successfully.";
    }

    @Override
    public User findById(int id) {
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }
}
