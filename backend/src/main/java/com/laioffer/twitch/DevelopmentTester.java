package com.laioffer.twitch;

import com.laioffer.twitch.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;


@Component
public class DevelopmentTester implements ApplicationRunner {
    private static final Logger logger = LoggerFactory.getLogger(DevelopmentTester.class);

    private final UserService userService;

    public DevelopmentTester(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
//        userService.register("Aden", "123456", "Aden", "Aden");
    }
}
