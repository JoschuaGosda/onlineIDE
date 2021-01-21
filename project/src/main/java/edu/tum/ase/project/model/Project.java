package edu.tum.ase.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.List;

@Entity
@Table (name = "projects")
public class Project implements Serializable {
    @Id
    @GeneratedValue (generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "project_id")
    private String id;

    @Column(name = "project_name", nullable = false, unique = true)
    private String name;

    @OneToMany (mappedBy = "project")
    @JsonIgnore
    @OnDelete(action= OnDeleteAction.CASCADE)
    private List<SourceFile> sourceFileList;

    public Project() {
    }

    public Project(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SourceFile> getSourceFileList() {
        return sourceFileList;
    }

    public void setSourceFileList(List<SourceFile> sourceFileList) {
        this.sourceFileList = sourceFileList;
    }
}
