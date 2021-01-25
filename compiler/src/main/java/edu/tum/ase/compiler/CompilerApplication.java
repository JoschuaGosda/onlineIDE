package edu.tum.ase.compiler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEurekaClient
@EnableZuulProxy
public class CompilerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CompilerApplication.class, args);
	}

}
