package com.MiniProject.automate_results;

import com.MiniProject.automate_results.service.gpa.gpaserviceImpl.GPAServiceImpl;
import com.MiniProject.automate_results.service.resultsCollection.ResultsCollectionService;
import com.MiniProject.automate_results.user.Role;
import com.MiniProject.automate_results.user.User;
import com.MiniProject.automate_results.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootApplication
public class AutomateResultsApplication {

    public AutomateResultsApplication(UserRepository userRepository, PasswordEncoder passwordEncoder, GPAServiceImpl gpaService, ResultsCollectionService resultsCollectionService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.gpaService = gpaService;
        this.resultsCollectionService = resultsCollectionService;
    }

    public static void main(String[] args) {
		SpringApplication.run(AutomateResultsApplication.class, args);
	}

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final GPAServiceImpl gpaService;
	private final ResultsCollectionService resultsCollectionService;
	@Bean
	CommandLineRunner createAdmin() {
		return args -> {
			String adminUsername = "admin";
			String adminPassword = "admin123";  // Ideally, encode this password
			String adminRole = "ROLE_ADMIN";

			// Check if the admin already exists
			Optional<User> adminUser = userRepository.findByRole("ADMIN");
			if (adminUser.isEmpty()) {
				var user = User.builder()
						.email("admin@gmail.com")
						.password(passwordEncoder.encode("admin321"))
						.role(Role.ADMIN)
						.build();
				userRepository.save(user);
				System.out.println("Admin user created successfully.");
			}

//			//gpaService.getCollection("67072eb383aa470a6b5774b5");
//			resultsCollectionService.saveResultsWithPdf("670768d701411a67cdb00dc8");

		};
	}

}
