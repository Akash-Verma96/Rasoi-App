import React, { useRef, useState } from "react";
import { Upload, XCircle } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { Link } from "react-router-dom";

function AddMeal() {
  const [name,setName] = useState("")
  const [price,setPrice] = useState(0)
  const [category,setCategory] = useState("")
  const [description,setDescription] = useState("")
  const [image,setImage] = useState(null)
  const [isFile,setFile] = useState(false)
  const [fileName,setFileName] = useState("")


  const fileInputRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click(); // open file chooser
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(!file) return ;
    setImage(e.target.files[0])
    setFile(true)
    setFileName(file.name)
  };

  const handleAddMeal = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();

      formData.append("name",name);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("description",description);
      formData.append("image",image);


    
    const res = await axios.post(
  BASE_URL + "restaurant/addMeal",
  formData,
  {
    withCredentials: true,
  }
);

      console.log(res);
      alert("Meal added Successfully !");
    } catch (error) {
      console.log("Add Meal frontend me error hai !")
    }
  }


  return (
    <div className="min-h-screen  flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white text-black shadow-lg rounded-2xl p-8">

        {/* Heading */}
        <div className="flex justify-between items-start" >
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Add New Meal
          </h2>

          <Link to={"/restaurant/Dashboard"} ><XCircle size={24} className="hover:scale-120 duration-200 hover:text-orange-500" /></Link>

        </div>

        <form onSubmit={handleAddMeal} className="space-y-5">

          {/* Meal Name */}
          <div>
            <label className="block text-gray-600 mb-1">Meal Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter meal name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-600 mb-1">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-600 mb-1">Category</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            >
              <option value="">Select Category</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non Veg</option>
              <option value="snacks">Snacks</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Meal description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-600 mb-2">Upload Image</label>

            <div onClick={handleUploadClick} className="flex items-center justify-center border-2 border-dashed border-orange-300 rounded-lg p-6 cursor-pointer hover:bg-orange-50 transition">
              {!isFile && <Upload className="text-orange-500 mr-2" size={20} />}
              {isFile ? <span  className="text-gray-500">{fileName}</span> : <span  className="text-gray-500">Upload Meal Image</span>}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            Add Meal
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddMeal;
