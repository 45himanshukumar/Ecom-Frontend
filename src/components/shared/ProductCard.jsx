import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    about = false,
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();

    const handleProductView = (product) => {
        if (!about) {
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    };

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems, 1, toast));
    };

    return (
        
        <div className="rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-shadow duration-300 hover:shadow-2xl bg-white">
            
            <div onClick={() => {
                handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice,
                })
            }} 
        
            className="w-full h-72 overflow-hidden bg-white flex justify-center items-center relative group"> 
                
                <img 
                className="h-full w-auto object-contain cursor-pointer transition-transform duration-500 transform group-hover:scale-110"
                src={image}
                alt={productName}>
                </img>
            </div>

            <div className="p-4">
                <h2 onClick={() => {
                handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice,
                })
            }}
                    className="text-sm font-semibold mb-1 cursor-pointer hover:text-blue-600">
                    {truncateText(productName, 25)}
                </h2>
                
                <div className="h-10 overflow-hidden mb-2">
                    <p className="text-gray-500 text-xs leading-tight">
                        {truncateText(description, 50)}
                    </p>
                </div>

            { !about && (
                <div className="flex items-center justify-between">
                {specialPrice ? (
                    <div className="flex flex-col">
                        <span className="text-gray-400 line-through text-xs">
                            ₹{Number(price).toFixed(0)}
                        </span>
                        <span className="text-sm font-bold text-slate-700">
                            ₹{Number(specialPrice).toFixed(0)}
                        </span>
                    </div>
                ) : (
                    <span className="text-sm font-bold text-slate-700">
                        ₹{Number(price).toFixed(0)}
                    </span>
                )}

                <button
                    disabled={!isAvailable || btnLoader}
                    onClick={() => addToCartHandler({
                        image,
                        productName,
                        description,
                        specialPrice,
                        price,
                        productId,
                        quantity,
                    })}
                    className={`bg-blue-600 ${isAvailable ? "opacity-100 hover:bg-blue-700" : "opacity-70"}
                        text-white text-xs py-1.5 px-3 rounded shadow-sm flex items-center transition-all duration-300`}>
                    <FaShoppingCart className="mr-1 text-xs"/>
                    {isAvailable ? "Add" : "Out"}
                </button>
                </div>
            )}
                
            </div>
            <ProductViewModal 
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    )
}

export default ProductCard;