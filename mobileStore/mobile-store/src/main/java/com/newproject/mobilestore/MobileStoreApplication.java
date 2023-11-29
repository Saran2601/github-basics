package com.newproject.mobilestore;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
@EnableAsync
@EnableJpaAuditing
@SpringBootApplication
@ComponentScan(basePackages = "com.newproject.mobilestore")
public class MobileStoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(MobileStoreApplication.class, args);
	}

}
