package edu.tum.ase.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.tum.ase.project.model.Project;
import edu.tum.ase.project.repository.ProjectRepository;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepository projectRepository;
	
	public Project createProject(Project project) {
		return projectRepository.save(project);
	}
	
	public Project findByName(String name) {
		return projectRepository.findByName(name);
	}
	
	public List<Project> getProjects() {
		return projectRepository.findAll();
	}
}
