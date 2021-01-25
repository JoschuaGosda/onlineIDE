package edu.tum.ase.project.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        /* First Approach with disabling CSRF to POST to site
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/**")
                .authenticated();
        */

        // Second Approach implementing CSRF Protection and Synchronizer Token Pattern
        http
                .formLogin()
                .successHandler(((httpServletRequest, httpServletResponse, authentication) -> {
                    httpServletResponse.setStatus(200);
                }))
                .and()
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .authorizeRequests()
                .antMatchers("/**")
                .authenticated();
    }
}
