package ao.co.unikivi.daac_backend.config.security;

import jakarta.validation.constraints.NotNull;

public record TokenResponseDto(@NotNull @NotNull String token) {
}
