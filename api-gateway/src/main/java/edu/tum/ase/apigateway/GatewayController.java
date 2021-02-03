package edu.tum.ase.apigateway;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class GatewayController {

	//everything at the root level should be now available under /ui the frontend
    @GetMapping(path = "/")
    public String index() {
        return "forward:/ui/";
    }
	
    //everything at the root level should be now available under /ui the frontend
   @GetMapping(path = "/{resourcePath}")
    public String index(@PathVariable("resourcePath") String resourcePath) {
    	System.out.println(resourcePath);
        return "forward:/ui/" + resourcePath;
    }
}
