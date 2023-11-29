package com.newproject.mobilestore.services.admin;

import org.springframework.http.ResponseEntity;

import com.newproject.mobilestore.models.admin.Item;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.CollectionModel;

public interface ItemService {

    public abstract CollectionModel<EntityModel<Item>> getItems();

    public abstract ResponseEntity<?> saveItem(Item item);

    public abstract EntityModel<Item> getItem(Long itemId);

    public abstract ResponseEntity<?> replaceItem(Long itemId, Item newItem);

    public abstract ResponseEntity<?> deleteItem(Long itemId);

}

