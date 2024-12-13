package com.GatewayService.GatewayService.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class GatewayCorsConfig {

  @Bean
  public CorsWebFilter corsWebFilter() {
    CorsConfiguration corsConfig = new CorsConfiguration();
    // Allow all origins during development
    // In production, replace with specific frontend origin
    corsConfig.addAllowedOrigin("http://localhost:5173");


    // Allow all methods
    corsConfig.addAllowedMethod("*");

    // Allow all headers
    corsConfig.addAllowedHeader("*");

    // Allow credentials (if needed for authentication)
    corsConfig.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfig);

    return new CorsWebFilter(source);
  }
}
