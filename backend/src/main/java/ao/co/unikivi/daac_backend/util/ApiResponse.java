package ao.co.unikivi.daac_backend.util;

import java.util.List;

public record ApiResponse<T>(
        boolean sucess,
        T data,
        List<String> errors,
        int errorCode,
        String message,
        long timestamp,
        String path
) {
}
