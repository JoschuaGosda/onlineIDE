package edu.tum.ase.project.service;

import edu.tum.ase.project.model.Project;
import edu.tum.ase.project.model.SourceFile;
import edu.tum.ase.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@EnableResourceServer//this make the SecurityContext available of the Gateway, together with Bean OAuth2RestTemplate one can access the GitLab Api
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private OAuth2RestOperations restTemplate;

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

    //add a user to the project
    private final String endpoint = "https://gitlab.com/api/v4/users/?username=";

    public Project shareProject(String projectId, String userId) {
        Project project = projectRepository
                .findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid projectId:" + projectId));
        // TODO: check against the gitlab api and only set user if he exists
        //replace the following by //project.setUserIds(restTemplate.getForObject(endpoint + "userId", Project[].class));
        project.setUserId(userId);
        projectRepository.save(project);
        return project;
    }

}
