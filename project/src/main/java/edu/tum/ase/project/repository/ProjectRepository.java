package edu.tum.ase.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.tum.ase.project.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {
	Project findByName(String name);
}
