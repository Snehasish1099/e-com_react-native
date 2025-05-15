import { PRODUCT_API } from "@/constants/Apis";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";

// Index screen 
const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch(PRODUCT_API)
            .then((res) => res.json())
            .then(setProducts);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard product={item} />}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
    },
});

export default Home