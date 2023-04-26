package com.pfe.najd.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CorsFilter implements Filter {
    @Value("${archive.front-server-url}")
    private String frontServerUrl;
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

//    @Override
//    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//        HttpServletResponse response = (HttpServletResponse) servletResponse;
//
//
//        response.setHeader("Access-Control-Allow-Origin",frontServerUrl);
//        response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
//        response.setHeader("Access-Control-Allow-Headers","*");
//        response.setHeader("Access-Control-Allow-Credentials","true");
//        response.setHeader("Access-Control-Max-Age","180");
//        filterChain.doFilter(servletRequest, servletResponse);
//
//    }
@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    HttpServletResponse response = (HttpServletResponse) servletResponse;
    HttpServletRequest request = (HttpServletRequest) servletRequest;

    response.setHeader("Access-Control-Allow-Origin", frontServerUrl);
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,PATCH,OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Max-Age", "180");

    if (request.getMethod().equals("OPTIONS")) {
        response.setStatus(HttpServletResponse.SC_OK);
        return;
    }
    filterChain.doFilter(servletRequest, servletResponse);
}
    @Override
    public void destroy() {

    }
}
