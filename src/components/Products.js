import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */
const Products = () => {
  const [state, setState] = useState({
    data: [],
    items: [],
    isLoading: false,
  });
  const [debouncetimeout, setdebounceTimeout] = useState(
    setTimeout(() => {}, 500)
  );
  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    performAPICall();
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call  to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    try {
      const res = await axios.get(config.endpoint + "/products");
      setState((prev) => ({ ...prev, data: res.data }));
      
    } catch (err) {
      // console.log(err);
    }
    setState((prev) => ({ ...prev, isLoading: false }));
  };
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await axios.get(
        config.endpoint + "/products/search?value=" + text.toLowerCase()
      );
      setState((prev) => ({ ...prev, data: res.data }));
    } catch (err) {
      // console.log(err.response.status);
      if (err.response.status === 404) {
        setState((prev) => ({ ...prev, data: [] }));
      }
    }
    setState((prev) => ({ ...prev, isLoading: false }));
  };
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    clearTimeout(debounceTimeout);
    setdebounceTimeout(
      setTimeout(() => {
        performSearch(event.target.value);
      }, 500)
    );
  };

  return (
    <div>
      
      <Header>
        
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <Box width={"30%"}>
          
          <TextField
            onChange={(e) => debounceSearch(e, debouncetimeout)}
            className="search-desktop"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Search for items/categories"
            name="search"
          />
        </Box>
      </Header>
      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        onChange={(e) => debounceSearch(e, debouncetimeout)}
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        
        <Grid container>
          
          <Grid item className="product-grid">
            
            <Box className="hero">
              
              <p className="hero-heading">
                
                India’s <span className="hero-highlight">
                  FASTEST DELIVERY
                </span>{" "}
                to your door step
              </p>
            </Box>
            {state.isLoading && (
              <Box style={{ textAlign: "center" }}>
                
                <CircularProgress style={{ margin: "1rem auto" }} />
                <p>Loading Products</p>
              </Box>
            )}
            {state.data.length === 0 && (
              <Box style={{ textAlign: "center" }}>
                
                <SentimentDissatisfied style={{ margin: "1rem auto" }} />
                <p>No products found</p>
              </Box>
            )}
            <Grid
              container
              spacing={2}
              sx={{
                paddingLeft: 2,
                paddingBottom: 4,
                paddingTop: 4,
                paddingRight: 2,
              }}
            >
              {state.data.length > 0 &&
                state.data.map((prod) => (
                  <Grid key={prod._id} item xs={6} md={3}>
                    <ProductCard
                      product={prod}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};
export default Products;
