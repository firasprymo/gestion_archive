package com.pfe.najd.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@ConfigurationProperties(prefix = "rsa")
public record RsaKeysConfiguration(RSAPublicKey publicKey, RSAPrivateKey privateKey) {

}
