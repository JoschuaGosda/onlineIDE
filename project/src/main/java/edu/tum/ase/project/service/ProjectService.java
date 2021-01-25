package edu.tum.ase.project.service;

import edu.tum.ase.project.model.Project;
import edu.tum.ase.project.model.SourceFile;
import edu.tum.ase.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@EnableResourceServer //this is needed to make the tokens available
public class ProjectService {

    //TODO: Implement methods to add users to a specific project, make it possible that only allowed users can see project

    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project findById(String projectId) {
        return projectRepository
                .findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid projectId:" + projectId));
    }

    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    public void deleteProject(Project project) {
        projectRepository.delete(project);
    }

    public Project updateProjectName(String projectId, String name) {
        Project project = projectRepository
                .findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid projectId:" + projectId));
        project.setName(name);
        projectRepository.save(project);
        return project;
    }

    // add Bean to support searching for users by the GitLab Api
    @Bean
    public OAuth2RestOperations restTemplate (OAuth2ClientContext context) {
        ClientCredentialsResourceDetails details = new ClientCredentialsResourceDetails();
        return new OAuth2RestTemplate(details, context);
    }
}
