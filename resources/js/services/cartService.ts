import axios from 'axios';

interface CartItem {
    variation_id: number;
    quantity: number;
}

export const cartService = {
    addToCart: async (item: CartItem) => {
        try {
            const response = await axios.post('/cart/add', item);
            return response.data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    },

    removeFromCart: async (id: number) => {
        try {
            const response = await axios.delete(`/cart/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    },

    updateCartItem: async (id: number, quantity: number) => {
        try {
            const response = await axios.patch(`/cart/${id}`, { quantity });
            return response.data;
        } catch (error) {
            console.error('Error updating cart item:', error);
            throw error;
        }
    },

    getCart: async () => {
        try {
            const response = await axios.get('/cart/api');
            return response.data;
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },

    clearCart: async () => {
        try {
            const response = await axios.delete('/cart');
            return response.data;
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    }
};
