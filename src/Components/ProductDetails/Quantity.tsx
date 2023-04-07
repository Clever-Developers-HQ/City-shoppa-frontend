import { useState } from "react";

interface QuantityProps {
  initialValue?: number;
}

const Quantity: React.FC<QuantityProps> = ({ initialValue = 1 }) => {
  const [quantity, setQuantity] = useState<number>(initialValue);

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
      <button
        className="bg-gray-200 mr-[-10px] text-gray-800 px-2 rounded-l font-bold"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        className=" w-7 text-center border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
      />
      <button
        className="bg-gray-200 ml-[-20px] text-gray-800 px-2 rounded-r font-bold"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
