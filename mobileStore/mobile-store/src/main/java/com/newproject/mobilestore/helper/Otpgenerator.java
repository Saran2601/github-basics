package com.newproject.mobilestore.helper;

import java.util.Random;

public class Otpgenerator {
    public static String generateOtp() {
        Random random = new Random();
        int otp = 100_000 + random.nextInt(900_000);
        return String.valueOf(otp);
    }
}

