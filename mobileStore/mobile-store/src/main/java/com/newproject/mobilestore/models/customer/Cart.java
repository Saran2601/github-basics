package com.newproject.mobilestore.models.customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.newproject.mobilestore.models.Signup;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Signup user;

    @OneToMany(mappedBy = "cart", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<CartItem> cartItems = new ArrayList<>();

}
