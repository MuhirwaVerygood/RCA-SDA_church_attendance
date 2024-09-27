//package com.verygood.attendance.config;
//
//import java.io.IOException;
//import jakarta.servlet.*;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//
//@Configuration
//public class SimpleCORSFilter implements Filter {
//
//    private final Logger log = LoggerFactory.getLogger(SimpleCORSFilter.class);
//
//    public SimpleCORSFilter() {
//        log.info("SimpleCORSFilter init");
//    }
//
//    @Override
//    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
//
//        HttpServletRequest request = (HttpServletRequest) req;
//        HttpServletResponse response = (HttpServletResponse) res;
//
//        // Set CORS headers
//        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept, X-Requested-With, Cache-Control, x-customer-header-1, x-customer-header-2");
//
//        // Handle preflight requests
//        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
//            response.setStatus(HttpServletResponse.SC_OK);
//            return;
//        }
//
//
//        // Continue with the filter chain for other requests
//        chain.doFilter(req, res);
//    }
//
//    @Override
//    public void init(FilterConfig filterConfig) {
//        // No specific initialization required
//    }
//
//    @Override
//    public void destroy() {
//        // No specific cleanup required
//    }
//
//
//}
