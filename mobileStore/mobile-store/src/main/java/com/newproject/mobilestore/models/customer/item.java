package com.newproject.mobilestore.models.customer;

import java.math.BigDecimal;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
@Table(name="customer_table")
public class item {

	@Id
    @GeneratedValue
	private Long id;

    @Column(nullable = false)
    private Long item_id;


	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String gen;

	@Column(nullable = false)
	private String ram;

	@Column(nullable = false)
	private String rom;

	@Column(nullable = false)
	private String refreshrate;

	@Column(nullable = false)
	private String resolution;

	@Column(nullable = false)
	private String screensize;

	@Column(nullable = false)
	private String features;

	@Column(nullable = false)
	private String imgurl;

	@Column(nullable = false)
	private BigDecimal price;

	@Column(nullable = false)
	private BigDecimal cost;

	@Column(nullable = false)
	private Long quantity;
}