package com.newproject.mobilestore.controllers.admin;

import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import com.newproject.mobilestore.models.admin.ItemSummary;
import com.newproject.mobilestore.services.admin.ItemSummaryService;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/admin/api")
public class ItemSummaryController {

    @Autowired
    ItemSummaryService itemSummaryService;

    @GetMapping("/items/summary")
    public EntityModel<ItemSummary> getItemSummary() {
        return itemSummaryService.getItemSummary();
    }
}

