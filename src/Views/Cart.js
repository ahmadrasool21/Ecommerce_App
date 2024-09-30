// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
// const{ItemId} = useParams();
const Products_array = useSelector((state)=> state.Ecom_Products.Products);  /// getting the products from redux...
const checkout_products_List = useSelector((state)=> state.Checkout.Products);
let checkout_products = Products_array.filter(product=> product.id == );

return (
checkout_products.map((product)=>(

))
)


}

export default Cart;