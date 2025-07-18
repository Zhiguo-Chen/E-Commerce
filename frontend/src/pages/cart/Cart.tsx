import {
  Breadcrumb,
  Input,
  Button,
  InputNumber,
  InputNumberProps,
  Checkbox,
} from 'antd';
import { Link } from 'react-router-dom';
import './Cart.scss';
import controller from '../../assets/images/controller.png';
import monitor from '../../assets/images/monitor.png';
import { useEffect, useState } from 'react';
import { getCartItems, removeFromCart } from '../../api/cart';
import { ProductImage } from '../../types/product';
import { API_URL } from '../../const/API_URL';
import { createNewOrder } from '../../api/order';

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    // This effect can be used to fetch cart items from an API or perform other side effects
    console.log('Cart component mounted');
    listCartItems();
  }, []);

  const listCartItems = async () => {
    try {
      const response = await getCartItems();
      console.log('Cart items:', response.data);
      const processedItems = processCartItems(response.data.cart.items || []);
      setCartItems(processedItems || []);
      setTimeout(() => {
        console.log('Processed cart items:', cartItems);
      }, 100);
      // Update state or perform actions with the cart items
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Handle error appropriately
    }
  };

  const processCartItems = (items: any[]) => {
    console.log('Processing cart items:', items);
    return items?.map((item: any) => ({
      id: item.id,
      image:
        `${API_URL}/public` +
          item.product.productImages?.find(
            (prdImg: ProductImage) => prdImg.isPrimary,
          ).imageUrl || '',
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));
  };

  const removeCartItem = (itemId: string) => {
    console.log(`Removing item with ID: ${itemId}`);
    return async () => {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId),
      );
      const data = await removeFromCart(itemId);
      console.log('Remove from cart response:', data);
    };
  };

  const calculateSubtotal = (price: number, quantity: number) =>
    price * quantity;
  const total = cartItems.reduce(
    (sum, item) => sum + calculateSubtotal(item.price, item.quantity),
    0,
  );

  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (itemId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems((prevSelected) => [...prevSelected, itemId]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((id) => id !== itemId),
      );
    }
  };

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to proceed to checkout.');
      return;
    }
    // Implement checkout logic here
    console.log('Proceeding to checkout with items:', selectedItems);
    // For example, you might redirect to a checkout page or call an API
    const response = await createNewOrder({
      paymentMethod: 'Credit Card', // Example payment method
      cartItemIds: selectedItems.map((id) => id.toString()), // Convert to string if needed
      shippingAddress: {
        address: '123 Example St',
        city: 'City',
        country: 'Country',
        postalCode: '123456',
      }, // Example shipping address
    });
    console.log('Checkout response:', response);
  };

  return (
    <div className="cart-page child-page-padding flex-1">
      <div className="breadcrumb-container">
        <Breadcrumb
          items={[{ title: <Link to="/">Home</Link> }, { title: 'Cart' }]}
        />
      </div>

      <div className="cart-content flex flex-column">
        <div className="cart-table">
          <div className="cart-header">
            <div className="cart-checkbox-col">
              <Checkbox
                checked={
                  selectedItems.length === cartItems.length &&
                  cartItems.length > 0
                }
                indeterminate={
                  selectedItems.length > 0 &&
                  selectedItems.length < cartItems.length
                }
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </div>
            <div className="product-col">Product</div>
            <div className="price-col">Price</div>
            <div className="quantity-col">Quantity</div>
            <div className="subtotal-col">Subtotal</div>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-checkbox-col">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onChange={(e) =>
                    handleCheckboxChange(item.id, e.target.checked)
                  }
                />
              </div>
              <div className="product-col position-relative">
                <button
                  className="delete-btn"
                  onClick={removeCartItem(item.id.toString())}
                >
                  ×
                </button>
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
              <div className="price-col">${item.price}</div>
              <div className="quantity-col">
                <div className="quantity-input">
                  <InputNumber
                    defaultValue={item.quantity}
                    min={1}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="subtotal-col">
                ${calculateSubtotal(item.price, item.quantity)}
              </div>
            </div>
          ))}

          <div className="cart-actions">
            <Button type="default" className="return-btn">
              Return To Shop
            </Button>
            <Button type="default" className="update-btn">
              Update Cart
            </Button>
          </div>
        </div>

        <div className="cart-summary flex justify-between align-start">
          <div className="coupon-section">
            <Input placeholder="Coupon Code" />
            <Button type="primary" className="apply-btn">
              Apply Coupon
            </Button>
          </div>

          <div className="cart-total">
            <h3>Cart Total</h3>
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${total}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total-row">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <Button
              type="primary"
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
