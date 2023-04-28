import { useState,  } from "react";

interface QuantityProps {
  quantity: any;
  setQuantity: any;
}

const Quantity: React.FC<QuantityProps> = ({ quantity, setQuantity }) => {


  const handleDecrement = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center mt-4">
      <p className="text-l text-gray-500">Quantity:</p>
      <div> 
      <button
        className="bg-gray-200 text-gray-800 px-2 mx-2 rounded-l font-bold"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        className=" w-8 h-8 p-1 text-center border-gray-300 focus:border-orange focus:ring-1 focus:ring-orangefocus:outline-none"
        type="text"
        id="quantity"
        name="quantity"
        onChange={() => setQuantity(quantity)}
        value={quantity}
      />
      <button
        className="bg-gray-200 mx-2 text-gray-800 px-2 rounded-r font-bold"
        onClick={handleIncrement}
      >
        +
      </button>
      </div>
    </div>
  );
};

export default Quantity;
