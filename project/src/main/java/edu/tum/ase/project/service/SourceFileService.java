package edu.tum.ase.project.service;

import edu.tum.ase.project.model.Project;
import edu.tum.ase.project.model.SourceFile;
import edu.tum.ase.project.repository.SourceFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SourceFileService {
    @Autowired
    private SourceFileRepository sourceFileRepository;

    public SourceFile createFile(SourceFile sourceFile){
        return sourceFileRepository.save(sourceFile);
    }

    public SourceFile findById(String sourceFileId) {
        return sourceFileRepository
                .findById(sourceFileId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid projectId:" + sourceFileId));
    }
    public List<SourceFile> getSourceFiles(Project project){
        return sourceFileRepository.findByProject(project);
    }

    public List<SourceFile> getAll(){
        return sourceFileRepository.findAll();
    }

    public void deleteFile(SourceFile sourceFile) {
        sourceFileRepository.delete(sourceFile);
    }

    public SourceFile updateSourceFileName(String sourceFileId, String name) {
        SourceFile sourceFile = sourceFileRepository
                .findById(sourceFileId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid sourceFileId:" + sourceFileId));
        sourceFile.setName(name);
        sourceFileRepository.save(sourceFile);
        return sourceFile;
    }

    public SourceFile updateSourceFileCode(String sourceFileId, String sourceCode) {
        SourceFile sourceFile = sourceFileRepository
                .findById(sourceFileId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid sourceFileId:" + sourceFileId));
        sourceFile.setSourceCode(sourceCode);
        sourceFileRepository.save(sourceFile);
        return sourceFile;
    }
}
