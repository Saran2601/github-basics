package com.newproject.mobilestore.models.admin;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@NoArgsConstructor
@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class Item {

	@Id
	@GeneratedValue
	private Long id;

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
	private BigDecimal cost;

	@Column(nullable = false)
	private BigDecimal price;

	@Column(nullable = false)
	private Long quantity;

	@JsonIgnore
	@CreatedDate
	private LocalDateTime createdDate;

	@JsonIgnore
	@LastModifiedDate
	private LocalDateTime lastModifiedDate;
}