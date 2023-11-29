package com.newproject.mobilestore.assembler.admin;

import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Component;

import com.newproject.mobilestore.controllers.admin.ItemActionController;
import com.newproject.mobilestore.controllers.admin.ItemController;
import com.newproject.mobilestore.models.admin.Item;

import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;



@Component
public class ItemModelAssembler implements RepresentationModelAssembler<Item, EntityModel<Item>> {

    @Override
    public EntityModel<Item> toModel(Item item) {
        return EntityModel.of(
                item,
                linkTo(methodOn(ItemController.class).getItem(item.getId())).withSelfRel(),
                linkTo(methodOn(ItemController.class).getItems()).withRel("items"),
                linkTo(methodOn(ItemActionController.class).getItemActions(item.getId())).withRel("itemActions")
        );
    }
}

