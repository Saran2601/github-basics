package com.newproject.mobilestore.services.admin.Impl;
import org.springframework.stereotype.Service;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import java.util.List;

import java.util.stream.Collectors;
import javax.transaction.Transactional;

import com.newproject.mobilestore.assembler.admin.ItemModelAssembler;
import com.newproject.mobilestore.controllers.admin.ItemController;
import com.newproject.mobilestore.exception.ResourceNotFoundException;
import com.newproject.mobilestore.exception.ResourceUniqueViolationException;
import com.newproject.mobilestore.models.admin.Item;
import com.newproject.mobilestore.repositories.admin.ItemActionRepository;
import com.newproject.mobilestore.repositories.admin.ItemRepository;
import com.newproject.mobilestore.services.admin.ItemService;



@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemActionRepository itemActionRepository;

    @Autowired
    ItemModelAssembler itemModelAssembler;

    @Override
    public CollectionModel<EntityModel<Item>> getItems() {
        List<EntityModel<Item>> items = itemRepository.findAll().stream()
                .map(itemModelAssembler::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                items,
                linkTo(methodOn(ItemController.class).getItems()).withSelfRel()
        );
    }

    @Override
    public ResponseEntity<?> saveItem(Item item) {
        Item savedItem = saveNewItem(item);
        EntityModel<Item> itemModel = itemModelAssembler.toModel(savedItem);
        return ResponseEntity
                .created(itemModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(itemModel);
    }

    @Override
    public EntityModel<Item> getItem(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(ResourceNotFoundException::new);
        return itemModelAssembler.toModel(item);
    }

    @Override
    public ResponseEntity<?> replaceItem(Long itemId, Item newItem) {
        Item updatedItem = itemRepository.findById(itemId)
                .map(item -> {
                    item.setName(newItem.getName());
                    item.setCost(newItem.getCost());
                    item.setPrice(newItem.getPrice());
                    item.setQuantity(newItem.getQuantity());
                    item.setGen(newItem.getGen());
                    item.setRam(newItem.getRam());
                    item.setRom(newItem.getRom());
                    item.setScreensize(newItem.getScreensize());
                    item.setFeatures(newItem.getFeatures());
                    item.setRefreshrate(newItem.getRefreshrate());
                    item.setResolution(newItem.getResolution());
                    item.setImgurl(newItem.getImgurl());

                    return itemRepository.save(item);
                })
                .orElseGet(() -> {
                    newItem.setId(itemId);
                    return saveNewItem(newItem);
                });
        EntityModel<Item> itemModel = itemModelAssembler.toModel(updatedItem);
        return ResponseEntity
                .created(itemModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(itemModel);
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteItem(Long itemId) {
        return itemRepository.findById(itemId)
                .map(item -> {
                    deleteItemWithRelatedItemActions(item);
                    return ResponseEntity.noContent().build();
                })
                .orElseThrow(ResourceNotFoundException::new);
    }

    protected Item saveNewItem(Item item) throws ResourceUniqueViolationException {
        // Optional<Item> duplicateItem1 = itemRepository.findByName(item.getName());
        // Optional<Item> duplicateItem2 = itemRepository.findByGen(item.getGen());
        // Optional<Item> duplicateItem3 = itemRepository.findByRam(item.getRam());
        // Optional<Item> duplicateItem4 = itemRepository.findByRom(item.getRom());
        // Optional<Item> duplicateItem5 = itemRepository.findByScreensize(item.getScreensize());
        // Optional<Item> duplicateItem=itemRepository.findByItem(item);
        try {
            return itemRepository.save(item);
        } catch(Exception e) {
            throw new ResourceUniqueViolationException();
        }
    }

    protected void deleteItemWithRelatedItemActions(Item item) {
        itemActionRepository.deleteAllByItem(item);
        itemRepository.deleteById(item.getId());
    }
}
