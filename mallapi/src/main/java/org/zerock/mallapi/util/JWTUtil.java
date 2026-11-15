package org.zerock.mallapi.util;

import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.InvalidClaimException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTUtil {
    private static String key = "1234567890123456789012345678901234567890";

    private static SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(JWTUtil.key.getBytes(StandardCharsets.UTF_8));
    }

    public static String generateToken(Map<String, Object> valueMap, int min) {
        return Jwts.builder()
                .header().add("typ", "JWT").and()
                .claims(valueMap)
                .issuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .expiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant()))
                .signWith(getSigningKey())
                .compact();
    }

    public static Map<String, Object> validateToken(String token) {
        Map<String, Object> claim = null;
        try {
            claim = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

        } 
        catch (MalformedJwtException malformedJwtException) {
            throw new CustomJWTException("MalFormed");
        } 
        catch (ExpiredJwtException expiredJwtException) {
            throw new CustomJWTException("Expired");
        }
        catch (InvalidClaimException invalidClaimException) {
            throw new CustomJWTException("Invalid");
        } 
        catch (JwtException jwtException) {
            throw new CustomJWTException("JWTError");
        } 
        catch (Exception e) {
            throw new CustomJWTException("Error");
        }

        return claim;
    }
}