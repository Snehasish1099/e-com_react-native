import { PRODUCT_API } from "@/constants/Apis";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";

// Index/Home screen that will appear as the first screen in the stack
const Home = () => {

    // For storing the data of all products 
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const getAllProductsApiCall = async () => {
        try {
            const res = await fetch(PRODUCT_API);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false)
        }
    };

    // Call the Api whenever the home screen appears 
    useEffect(() => {
        getAllProductsApiCall()
    }, []);

    // onRefresh functionality for getting all data on pulling the screen 
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getAllProductsApiCall()
        setRefreshing(false);
    }, []);

    return (
        <View style={styles.container}>

            {/* When data is not fetched yet, it will show loading state, after the data is fetched, it will show the List of products */}
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="small" color="#0000ff" />
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={({ item }) =>
                        <ProductCard
                            product={item}
                        />
                    }
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Home