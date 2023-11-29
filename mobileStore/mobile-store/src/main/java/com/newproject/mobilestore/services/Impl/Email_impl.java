package com.newproject.mobilestore.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.newproject.mobilestore.services.Email_service;

@Service
public class Email_impl implements Email_service {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromGmail;

    @Override
    public void sendRegistrationEmail(String toGmail, String userName) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromGmail);
            mailMessage.setTo(toGmail);
            mailMessage.setSubject("Welcome to Sasika Mobiles! 📱");
            mailMessage.setText(getRegistrationEmailMessage(userName));

            javaMailSender.send(mailMessage);

            System.out.println("Email sent successfully to: " + toGmail);
        } catch (Exception e) {
            System.err.println("Error sending email to: " + toGmail);
            e.printStackTrace();
        }
    }

    private String getRegistrationEmailMessage(String userName) {
        return "Dear " + userName + ",\n\n" +
               "Welcome to Sasika Mobiles! We're thrilled to have you as part of our mobile community. 🎉 Thank you for choosing us for your mobile needs.\n\n" +
               "At Sasika Mobiles, we strive to provide the latest and greatest in mobile technology, ensuring that you stay connected with the world in style. Whether you're looking for the newest releases or reliable classics, we've got a mobile solution for everyone.\n\n" +
               "Feel free to explore our app and discover a world of cutting-edge features, exclusive deals, and personalized recommendations. If you have any questions or need assistance, our team is here to help.\n\n" +
               "Happy shopping, and thank you for choosing Sasika Mobiles!\n\n" +
               "Best regards,\nThe Sasika Mobiles Team";
      }

    @Override  
    public void sendOtpEmail(String to, String subject, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText("Your OTP for password reset is: " + otp);
        javaMailSender.send(message);
    }  

}
