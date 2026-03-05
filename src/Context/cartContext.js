import { useAuth } from "./userContext";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const CartContext = createContext();
// const BASE_URL = "http://localhost:5000/api/cart";

export const CartProvider = ({ children }) => {

    const { user } = useAuth()
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
    });

    // const cartCount = cart.length;
    const BASE_URL = "http://localhost:5000/api/cart";


    useEffect(() => {
        if (user) {
            getCart();

        } else {

            setCart([]);
            setCartCount(0);

        }
    }, [user]);




    const getCart = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/getcart`,
                { withCredentials: true }


            )
            console.log("cart responce==", res.data)
            setCart(res.data.data.items || []);
            setTotalPrice(res.data.data.totalPrice)

            setCartCount(res.data.data.totalItems || 0)

        }
        catch (error) {
            console.log(error)

            setCart([]);
            // setCartCount(0)

        }
        finally {
            setLoading(false)
        }
    }

    const addToCart = async (productId, quantity = 1) => {
        setLoading(true)


        try {
            await axios.post(`${BASE_URL}/addtocart`,
                {
                    productId, quantity
                },
                {
                    withCredentials: true
                }

            )
            await getCart();
            console.log(cart)

        }
        catch (error) {
            console.log("add to cart failed")

        }
        finally {
            setLoading(false)
        }
    }


    const updateCart = async (productId, quantity) => {
        setLoading(true)
        try {
            await axios.post(`${BASE_URL}/update`,
                {
                    productId, quantity
                },
                {
                    withCredentials: true
                }
            )
            await getCart()
        }
        catch (error) {
            console.log(error)

        }
        finally {
            setLoading(false)
        }
    }


    const deleteItem = async (productId) => {
        setLoading(true)
        try {
            await axios.delete(`${BASE_URL}/deleteItem/${productId}`,
                {
                    withCredentials: true
                }
            );
            await getCart()
        }
        catch {

            console.error("delete item failed")

        }
        finally {
            setLoading(false)

        }

    }
    const clearCart = async () => {

        setLoading(true)
        try {
            await axios.delete(`${BASE_URL}/clearcart`,
                {
                    withCredentials: true
                }
            )
            await getCart()



        }
        catch (error) {
            console.log("Error while clearing the cart")

        }
        finally {

            setLoading(false)
        }

    }
    const placeOrder = async (address) => {
        try {
            console.log("Address sending:", address);
            const res = await axios.post(`http://localhost:5000/api/order/placeOrder`,


                { shippingAddress: address },
                { withCredentials: true }
            )
            console.log("success responce:", res.data)
            return {
                success: true,
                data: res.data
            }
        }




        catch (error) {
            if (error.response) {
                console.log("FULL ERROR:", error.response?.data);

                return {
                    success: false,
                    message: error.response.data.message
                }

            }
            else {
                console.log("network error", error.message)

                return {
                    success: false,
                    message: "something went wrong"
                }

            }
        }
        // catch (error) {
        //     console.log("AXIOS ERROR OBJECT:", error);
        //     console.log("error.response:", error.response);
        //     console.log("error.message:", error.message);
        // }


    }

    return (
        <CartContext.Provider value={{ cart, cartCount, totalPrice, loading, getCart, addToCart, updateCart, deleteItem, clearCart, placeOrder, address, setAddress }}>
            {children}
        </CartContext.Provider>

    )


}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context
}

