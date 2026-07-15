import React, { useState, useContext } from "react"; // useState is used to manage the state of the form inputs and loading state, useContext is used to access the AuthContext for user authentication.
import { AuthContext } from "../context/AuthContext"; // AuthContext is imported to access the current user's authentication state and role.
import { useNavigate } from "react-router-dom"; // useNavigate is imported to programmatically navigate the user to different routes based on their actions (e.g., after successfully adding a product).

const AddProduct = () => {
  const { user } = useContext(AuthContext); // Access the user from AuthContext
  const navigate = useNavigate();   

  const [formData, setFormData] = useState({ // State to hold the form data for the new product
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });
  const [image, setImage] = useState(null); // State to hold the selected image file
  const [loading, setLoading] = useState(false);   // State to manage the loading state during form submission  

  if (!user || user.role !== "admin") { // Check if the user is not logged in or not an admin
    navigate("/");
    return null;
  }     

  const handleSubmit = async (e) => { // Function to handle form submission
    e.preventDefault();
    if (!image) return alert("Please select an image");     
    
    setLoading(true); // Set loading state to true while the form submission is in progress
    const data = new FormData(); // Create a new FormData object to hold the form data and image file
    data.append("name", formData.name);     // Append the product name to the FormData object
    data.append("description", formData.description); // Append the product description to the FormData object
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("image", image);    

    try {
      const res = await fetch("/api/products", { // Send a POST request to the server to create a new product
        method: "POST", // Specify the HTTP method as POST
        headers: { // Set the Authorization header with the user's token for authentication
            Authorization: `Bearer ${user.token}`,  // Include the user's token in the request headers for authentication
        },
        body: data, // Include the FormData object in the request body
      });
      const responseData = await res.json(); // Parse the JSON response from the server

        if (res.ok) {    // If the response is successful (status code 200-299), show a success alert and navigate to the shop page
            alert("Product created successfully with Cloudinary Image URL!");
            navigate("/shop");
        } else {         // If the response is not successful, show an error alert with the message from the server or a default error message
            alert(responseData.message || "Error creating product");
        }
    } catch (error) { // Catch any errors that occur during the fetch request and log them to the console
      console.error(error);
    } finally { //  Regardless of whether the request was successful or not, set the loading state back to false after the request is complete
      setLoading(false);
    }   

    };  

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", background: "#18181b", padding: "40px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 style={{ color: "#f97316", marginBottom: "20px" }}>Add New Product</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>    
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    style={inputStyle} 
                />
                <textarea 
                    placeholder="Product Description" 
                    required 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    style={inputStyle} 
                />
                <input 
                    type="text" 
                    placeholder="Category" 
                    required 
                    onChange={(e) => setFormData({...formData, category: e.target.value})} 
                    style={inputStyle} 
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    required 
                    onChange={(e) => setFormData({...formData, price: e.target.value})} 
                    style={inputStyle} 
                />
                <input 
                    type="number" 
                    placeholder="Stock" 
                    required 
                    onChange={(e) => setFormData({...formData, stock: e.target.value})} 
                    style={inputStyle} 
                />
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setImage(e.target.files[0])} 
                    style={inputStyle} 
                />
                <button type="submit" disabled={loading} style={buttonStyle}>
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
