import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  id: number | null = null;
  products: Product[] = [];
  product: Product | null = null;

  selectedOption: string = '';
  productCount: string[] = [];
  existInCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });

    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.product = this.getProductById(this.id);
      this.productCount = this.productService.getProductCount();
    });
  }

  getProductById = (id: number | null): Product => {
    const currentProducts: Product[] = this.productService.getCartProducts();
    const productInCart = currentProducts.find((p) => p.id === id);
    this.selectedOption = productInCart ? productInCart.amount : '';
    this.existInCart = productInCart ? true : false;
    return this.products.filter((product) => product.id === id)[0];
  }

  onChangeOption = (value: string): void => {
    this.selectedOption = value;
  }

  removeItem = (id: number) => {
    let message: string = '';
    const storageProducts = this.productService.getCartProducts();
    const products = storageProducts.filter(
      (product: Product) => product.id !== id
    );
    this.productService.clearCart();
    this.productService.addToCart(products);
    message = `The product "${this.product!.name}" has been successfully removed from your cart.`;
    alert(message);
    this.refresh();
  }

  addProductToCart = (product: Product): void => {
    const currentProducts: Product[] = this.productService.getCartProducts();
    const productInCart = currentProducts.find((p) => p.id === product.id);
    let message: string = '';

    if(!this.selectedOption){
      message = 'Please select a quantity';
      alert(message);
      return
    }

    if (productInCart) {
      if (productInCart.amount === this.selectedOption) {
        message = `Sorry, this product "${productInCart.name}" already exists in your cart.`;
        alert(message);
        return
      } else {
        message = `The quantity of the product "${productInCart.name}" has been successfully updated.`;
        productInCart.amount = this.selectedOption;
        this.productService.addToCart(currentProducts);
        alert(message);
        this.refresh();
      }
    } else {
      currentProducts.push(
        Object.assign(product, { amount: this.selectedOption })
      );
      this.productService.addToCart(currentProducts);
      message = `The product "${product.name}" has been successfully added to your cart.`;
      alert(message);
      this.refresh();
    }
  }

  refresh = (): void => {
    window.location.reload();
  }
}
