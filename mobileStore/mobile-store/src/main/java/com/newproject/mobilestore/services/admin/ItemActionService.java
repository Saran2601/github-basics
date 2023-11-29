package com.newproject.mobilestore.services.admin;

import org.springframework.http.ResponseEntity;

import com.newproject.mobilestore.models.admin.ItemAction;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.CollectionModel;

public interface ItemActionService {

    public abstract CollectionModel<EntityModel<ItemAction>> getItemActions(Long itemId);

    public abstract ResponseEntity<?> saveItemAction(Long itemId, ItemAction itemAction);

    public abstract EntityModel<ItemAction> getItemAction(Long itemId, Long itemActionId);

    public abstract ResponseEntity<?> replaceItemAction(Long itemId, Long itemActionId, ItemAction newItemAction);

    public abstract ResponseEntity<?> deleteItemAction(Long itemId, Long itemActionId);
}