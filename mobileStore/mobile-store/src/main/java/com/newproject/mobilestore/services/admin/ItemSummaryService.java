package com.newproject.mobilestore.services.admin;

import org.springframework.hateoas.EntityModel;

import com.newproject.mobilestore.models.admin.ItemSummary;

public interface ItemSummaryService {

    public abstract EntityModel<ItemSummary> getItemSummary();
}
