package com.newproject.mobilestore.config;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.newproject.mobilestore.models.customer.Cart;

public class CartSerializer extends JsonSerializer<Cart> {
    @Override
    public void serialize(Cart cart, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        // Implement custom serialization logic here
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", cart.getId());
        jsonGenerator.writePOJOField("cartitems", cart.getCartItems().get(0));
        // Serialize other fields as needed
        // Example: jsonGenerator.writeStringField("userName", cart.getUser().getName());
        jsonGenerator.writeEndObject();
    }
}
