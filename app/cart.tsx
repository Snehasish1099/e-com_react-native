import { useCart } from "@/contexts/CartContext";
import React from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

// Cart screen 
const Cart = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item?.price * item?.quantity, 0);    // To get the total of the cart items and quantity in real-time

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item, index }) => (
                    <View style={[styles.item, cart.length > 1 && index < cart.length - 1 ? styles.itemWithBorder : null]}>
                        <Text style={styles.title}>{item?.title}</Text>
                        <Text style={styles.price}>${item?.price?.toFixed(2)} x {item?.quantity}</Text>

                        {/* Input where we can change the quantity as we wish  */}
                        <TextInput
                            keyboardType="numeric"
                            defaultValue={item?.quantity?.toString()}
                            onChangeText={(text) => updateQuantity(item?.id, Number(text))}
                            style={styles.input}
                        />

                        {/* Button to remove a specific item from cart  */}
                        <View style={styles.removeButton}>
                            <Button
                                title="Remove"
                                color="red"
                                onPress={() => removeFromCart(item?.id)}
                            />
                        </View>
                    </View>
                )}
            />
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    item: {
        marginBottom: 16,
    },
    itemWithBorder: {
        borderBottomWidth: 1.5,
        borderBottomColor: "#ccc",
        marginBottom: 16,
        paddingBottom: 16,
    },
    title: {
        fontWeight: "bold",
        color: "#000000",
        fontSize: 16,
    },
    price: {
        color: "#16a34a",
        marginTop: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        padding: 8,
        marginTop: 8,
        color: "#000000",
    },
    total: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
        marginTop: 16,
    },
    removeButton: {
        marginTop: 8,
        width: "auto"
    }
});

export default Cart