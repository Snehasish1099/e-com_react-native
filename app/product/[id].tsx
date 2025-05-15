import { PRODUCT_API } from "@/constants/Apis";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";

// Product Details screen 
const ProductDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { cart, addToCart, removeFromCart } = useCart();

    // For fetching product details and storing the data 
    const [product, setProduct] = useState<Product | null>(null);

    const getProductByIdApiCall = async () => {
        try {
            const res = await fetch(`${PRODUCT_API}/${id}`);
            const data = await res.json();
            setProduct(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }

    // Api call whenever the screen appears 
    useEffect(() => {
        getProductByIdApiCall()
    }, [id]);


    // UI starts 
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
            <View style={styles.rating}>
                <Ionicons name="star" size={15} color="gold" />
                <Text style={styles.ratingText}>{product.rating.rate} ({product.rating.count} reviews)</Text>
            </View>

            {/* Add to or remove from Cart logic for product items */}
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
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 4,
        marginBottom: 8,
        gap: 5
    },
    ratingText: {
        color: '#facc15',
    }
});

export default ProductDetail