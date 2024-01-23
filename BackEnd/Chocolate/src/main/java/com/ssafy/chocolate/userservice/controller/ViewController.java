package com.ssafy.chocolate.userservice.controller;

import com.ssafy.chocolate.userservice.config.AdminAuthorize;
import com.ssafy.chocolate.userservice.config.UserAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class ViewController {

    @GetMapping("/login")
    public String loginPage() {
        return "login.html";
    }

    @GetMapping("/join")
    public String joinPage() {
        return "join.html";
    }

    @GetMapping("/dashboard")
    public String dashboardPage(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("loginId", user.getUsername());
        model.addAttribute("loginRoles", user.getAuthorities());
        return "dashboard.html";
    }

    @GetMapping("/setting/admin")
    @AdminAuthorize
    public String adminSettingPage() {
        return "admin_setting.html";
    }

    @GetMapping("/setting/user")
    @UserAuthorize
    public String userSettingPage() {
        return "user_setting.html";
    }
}