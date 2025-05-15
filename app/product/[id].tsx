import { PRODUCT_API } from "@/constants/Apis";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text } from "react-native";

// Product Details screen 
const ProductDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const { cart, addToCart, removeFromCart } = useCart();

    useEffect(() => {
        fetch(`${PRODUCT_API}/${id}`)
            .then((res) => res.json())
            .then(setProduct);
    }, [id]);

    if (!product) return null;

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.rating}>
                ⭐ {product.rating.rate} ({product.rating.count})
            </Text>
            {cart.some((item) => item.id === product.id) ? (
                <Button
                    title="Remove from Cart"
                    color="red"
                    onPress={() => removeFromCart(product.id)}
                />
            ) : (
                <Button title="Add to Cart" onPress={() => addToCart(product)} />
            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    image: {
        height: 256,
        width: "100%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
        marginTop: 16,
    },
    description: {
        color: "#4b5563",
        marginTop: 8,
    },
    price: {
        color: "#16a34a",
        marginTop: 8,
    },
    rating: {
        color: "#f59e0b",
        marginTop: 4,
        marginBottom: 8,
    },
});

export default ProductDetail