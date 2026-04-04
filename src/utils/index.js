import { FaBoxOpen, FaHome, FaShoppingCart, FaStore, FaThList } from "react-icons/fa";
import { bannerImageOne, bannerImageThree, bannerImageTwo} from "./constant";

export const bannerLists = [
    {
      
        id: 1, 
        image: bannerImageOne, 
        title: "Little Trendsetters",
        subtitle: "Kids' Fashion",
        description: "Stylish and comfortable outfits for your little ones.",
      },
      {
        id: 2,
        image: bannerImageTwo,
        title: "Entertainment Hub",
        subtitle: "Smart TV",
        description: "Experience the latest in home entertainment",
      },
      {
        id: 3, 
        image: bannerImageThree, 
        title: "Modern Living",
        subtitle: "Premium Furniture",
        description: "Transform your home with our elegant furniture collection.",
      }
      
];


export const adminNavigation = [
  {
    name: "Dashboard", 
    href: "/admin", 
    icon: FaHome, 
    current: true 
  }, {
    name: "Orders", 
    href: "/admin/orders", 
    icon: FaShoppingCart
  }, {
    name: "Products", 
    href: "/admin/products", 
    icon: FaBoxOpen
  }, {
    name: "Categories", 
    href: "/admin/categories", 
    icon: FaThList
  }, {
    name: "Sellers", 
    href: "/admin/sellers", 
    icon: FaStore 
  }
];


export const sellerNavigation = [
  {
    name: "Orders", 
    href: "/admin/orders", 
    icon: FaShoppingCart,
    current: true 
  }, {
    name: "Products", 
    href: "/admin/products", 
    icon: FaBoxOpen
  }
];