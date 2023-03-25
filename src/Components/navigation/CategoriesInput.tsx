
export default function CategoriesInput() {
    return (
      <div>
        <select
          id="location"
          name="location"
          className="mr-2 block w-full pl-2 pr-10 py-1 text-base bg-white text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
          defaultValue="Canada"
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </select>
      </div>
    )
  }
  