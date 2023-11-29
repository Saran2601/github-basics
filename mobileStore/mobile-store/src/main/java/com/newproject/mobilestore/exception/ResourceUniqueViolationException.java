package com.newproject.mobilestore.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ResourceUniqueViolationException extends RuntimeException {

    public ResourceUniqueViolationException() {
        super("Duplicate Resource");
    }
}
