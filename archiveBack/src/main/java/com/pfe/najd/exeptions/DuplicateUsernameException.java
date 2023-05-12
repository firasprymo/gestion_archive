package com.pfe.najd.exeptions;

import org.springframework.dao.DataIntegrityViolationException;

public class DuplicateUsernameException extends DataIntegrityViolationException {
    public  DuplicateUsernameException(String message) {
        super(message);
    }
}
