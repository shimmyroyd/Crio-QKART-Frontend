import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart, products, items }) => {
  return (
    <Card className="card">
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography>
          {product.name}
        </Typography>
        <Typography>
          ${product.cost}
        </Typography>
        <Rating name="read-only" precision={0.5} value={product.rating} readOnly />
      </CardContent>
      <CardActions className="card-actions">
        <Button 
        className="card-button"
        variant="contained"
        startIcon={<AddShoppingCartOutlined />}
        fullWidth
        onClick={() => handleAddToCart(localStorage.getItem("token"), items, products, product._id, 1, {preventDuplicate:true})}
        >
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
