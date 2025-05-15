import { useCart } from '@/contexts/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const pathname = usePathname();

    const { cart } = useCart();

    const isHome = pathname === '/';
    const isCart = pathname.includes('cart');

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.leftSection}>
                    {!isHome && (
                        <TouchableOpacity onPress={() => router.back()} style={styles.icon}>
                            <Ionicons name="arrow-back-outline" size={24} color="#000" />
                        </TouchableOpacity>
                    )}
                    <Text style={styles.title}>
                        {isCart ? 'Cart' :
                            pathname.includes('product') ? 'Product Details' :
                                'E-comm App'}
                    </Text>
                </View>

                <View style={styles.iconContainer}>
                    {!isHome ? (
                        <TouchableOpacity onPress={() => router.push('/')}>
                            <Ionicons name="home-outline" size={24} color="#000" />
                        </TouchableOpacity>
                    ) : (
                        <View>
                            <Ionicons name="home-outline" size={24} color="#16a34a" />
                        </View>
                    )}

                    {!isCart ? (
                        <TouchableOpacity onPress={() => router.push('/cart')} style={styles.cartIcon}>
                            <Ionicons name="cart-outline" size={24} color="#000" />
                            {cart.length > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{cart.length}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.cartIcon}>
                            <Ionicons name="cart-outline" size={24} color="#16a34a" />
                            {cart.length > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{cart.length}</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingHorizontal: 25,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iconContainer: {
        width: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    icon: {
        marginRight: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    cartIcon: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        right: -8,
        top: -5,
        backgroundColor: 'red',
        borderRadius: 8,
        paddingHorizontal: 5,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default Header