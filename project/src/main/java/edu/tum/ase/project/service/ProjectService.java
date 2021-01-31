package edu.tum.ase.project.service;

import edu.tum.ase.project.model.Project;
import edu.tum.ase.project.model.SourceFile;
import edu.tum.ase.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
//@EnableResourceServer//this make the SecurityContext available of the Gateway, together with Bean OAuth2RestTemplate one can access the GitLab Api
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    /*@Autowired
    private OAuth2RestOperations restTemplate;*/

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
    public Project shareProject(String projectId, Set<String> userIds) {
        Project project = projectRepository
                .findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid projectId:" + projectId));
        // TODO: check against the gitlab api and only set user if he exists
        //restTemplate.getForObject(...);
        project.setUserIds(userIds);
        projectRepository.save(project);
        return project;
    }

}
