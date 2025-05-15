import { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

// Product Card common component, that is clickable/pressable
const ProductCard = ({ product }: { product: Product }) => {
    const router = useRouter();

    return (
        <Pressable
            onPress={() => router.push(`/product/${product?.id}`)}
            style={styles.card}
        >
            <Image
                source={{ uri: product?.image }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title} numberOfLines={1}>{product?.title}</Text>
            <Text style={styles.price}>${product?.price?.toFixed(2)}</Text>
            <View style={styles.rating}>
                <Ionicons name="star" size={15} color="gold" />
                <Text style={styles.ratingText}>{product?.rating?.rate}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        width: '46%',
        elevation: 3, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        height: 128,
        width: '100%',
    },
    title: {
        color: '#000000',
        fontWeight: '600',
        marginTop: 8,
    },
    price: {
        color: '#16a34a',
        marginTop: 4,
    },
    rating: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 4,
        gap: 5
    },
    ratingText: {
        color: '#facc15',
    }
});

export default ProductCard;
