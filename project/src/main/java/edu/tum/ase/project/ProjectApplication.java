package edu.tum.ase.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
@EnableEurekaClient
public class ProjectApplication{

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}

	/*
	@Bean
	public OAuth2RestOperations restTemplate(OAuth2ClientContext context) {
		ClientCredentialsResourceDetails details = new ClientCredentialsResourceDetails();
		return new OAuth2RestTemplate(details, context);
	}*/


}