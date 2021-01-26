package edu.tum.ase.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@EnableEurekaClient
@EnableZuulProxy
@RestController
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @GetMapping("/api/project")
    public List<Project> getProjects() {
        List<Project> projects = new ArrayList<>();
        projects.add(new Project(1, "Learning C"));
        projects.add(new Project(2, "ASE Project"));
        projects.add(new Project(3, "My favorite language Java"));
        return projects;
    }

    private static class Project {
        public int id;
        public String name;

        Project(int id, String name) {
            this.id = id;
            this.name = name;
        }
    }

    @GetMapping("/authenticated")
    public boolean authenticated() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        if (authentication != null) {
            return authentication.getAuthorities().stream()
                    .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ANONYMOUS"));
        }
        return false;
    }

    @RequestMapping("/user")
    public Principal user() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
