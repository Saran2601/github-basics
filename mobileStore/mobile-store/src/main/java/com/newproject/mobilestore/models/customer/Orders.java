package com.newproject.mobilestore.models.customer;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String orderStatus;
    private String userName;
    private String userEmail;
    private String address;
    private String mobileNumber;
    private String paymentType;
    
    @CreatedDate
    private LocalDateTime createdDate; 

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderItem> items = new ArrayList<>();

    private double subtotal;
    private double deliveryCharge;
    private double estimatedTax;
    private double estimatedAmount;

    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }

}
