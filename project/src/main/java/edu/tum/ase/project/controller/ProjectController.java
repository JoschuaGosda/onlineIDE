package edu.tum.ase.project.controller;

import edu.tum.ase.project.model.Project;
import edu.tum.ase.project.model.SourceFile;
import edu.tum.ase.project.service.ProjectService;
import edu.tum.ase.project.service.SourceFileService;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private SourceFileService sourceFileService;

    /*
    @Autowired
    private RestTemplate restTemplate;
     */

    @Autowired
    private DiscoveryClient discoveryClient;

    //This is the adress of the api gateway -> server side service discovery, in the frontend just /projects is enough
    private final String BACKEND_BASE_URL = "http://localhost:8000/project/";

    /*
    @GetMapping("/")    //introduced in Exercise 12 -> check for all, also shared projects
    public String index(Model model) {
        // try to obtain all IP addresses of deployed backend-services

        //TODO: The following has to be adapted to fit to the online IDE, also backend-service should be replaced by some project tag?
        List<ServiceInstance> serviceInstanceList = discoveryClient.getInstances("backend-service");
        serviceInstanceList.forEach((ServiceInstance instanceInfo) -> {
            System.out.println(ToStringBuilder.reflectionToString(instanceInfo));
        });

        model.addAttribute("projects", restTemplate.getForObject(BACKEND_BASE_URL, Project[].class));
        return "index";
    }
    */


    // Before Exercise 12
    @GetMapping("/")
    public List<Project> index() {
        return projectService.getProjects();
    }

    @PostMapping(path = "/create-project")
    public Project create_project (@RequestBody Project project) {
        return projectService.createProject(project);
    }

    @DeleteMapping(path = "/delete-project/{id}")
    public void delete_project (@PathVariable("id") String projectId) {
        Project project = projectService.findById(projectId);
        projectService.deleteProject(project);
    }

    @GetMapping("/read-project/{id}")
    public List<SourceFile> readProject (@PathVariable("id") String projectId) {
        Project project = projectService.findById(projectId);
        return sourceFileService.getSourceFiles(project);
    }

    @PostMapping("/update-project-name/{id}")
    public Project updateProjectName (@PathVariable("id") String sourceFileId, @RequestBody String name){
        return projectService.updateProjectName(sourceFileId, name);
    }
}
