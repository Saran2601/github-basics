package com.newproject.mobilestore.services;

public interface Email_service {
    public abstract void sendRegistrationEmail(String toGmail, String userName);
    public abstract void sendOtpEmail(String to, String subject, String otp);
}
