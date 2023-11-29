package com.newproject.mobilestore.repositories.admin;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newproject.mobilestore.models.admin.Item;

public interface ItemRepository extends JpaRepository<Item, Long> 

{

    Optional<Item> findByName(String Name);

    Optional<Item> findByGen(String gen);

    Optional<Item> findByRam(String ram);

    Optional<Item> findByRom(String rom);

    Optional<Item> findByScreensize(String screensize);
}

