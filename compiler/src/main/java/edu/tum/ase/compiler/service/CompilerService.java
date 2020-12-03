package edu.tum.ase.compiler.service;

import edu.tum.ase.compiler.model.CompilationResult;
import edu.tum.ase.compiler.model.SourceCode;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.nio.charset.Charset;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class CompilerService {

    private final static Map<String, String> EXTENSION_TO_COMPILER_NAME = Map.of(
            "java", "javac",
            "c", "gcc"
    );

    public CompilationResult compile(SourceCode sourceCode) throws Exception {
        String fileName = sourceCode.getFileName();
        String sourceCodeExtension = FilenameUtils.getExtension(fileName);

        if(!EXTENSION_TO_COMPILER_NAME.containsKey(sourceCodeExtension)) {
            throw new IllegalArgumentException();
        }

        // Create temporary compilation directory
        String compilationDirectoryName = "compilation-" + UUID.randomUUID();
        File compilationDirectory = new File(compilationDirectoryName);
        compilationDirectory.mkdir();

        // Create temporary source code file

        FileWriter writer = new FileWriter(compilationDirectoryName + "/" + fileName);
        writer.write(sourceCode.getCode());
        writer.close();

        // Compile
        String compilerName = EXTENSION_TO_COMPILER_NAME.get(sourceCodeExtension);
        Process process = Runtime
                .getRuntime()
                .exec(compilerName + " " + compilationDirectoryName + "/" + fileName);

        // Extract compilation results
        CompilationResult compilationResult = new CompilationResult();
        compilationResult.setStderr(IOUtils.toString(process.getErrorStream(), Charset.defaultCharset()));
        compilationResult.setStdout(IOUtils.toString(process.getInputStream(), Charset.defaultCharset()));
        compilationResult.setCompilable(compilationResult.getStderr().isEmpty());

        // Delete temporary files
        Stream.of(compilationDirectory.listFiles()).forEach(File::delete);
        compilationDirectory.delete();

        return compilationResult;
    }
}
