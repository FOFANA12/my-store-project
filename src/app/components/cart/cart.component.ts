import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  productCount: string[] = [];
  totalPrice: number = 0;
  selectedOption: string = '';

  constructor(private productService: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.productCount = this.productService.getProductCount();
    this.products = this.productService.getCartProducts();
    this.calculateTotal();
  }

  calculateTotal = (): void => {
    this.totalPrice = 0;
    this.products.forEach((item) => {
      this.totalPrice += (Number(item.amount) * Number(item.price));
    });
  }

  onSubmit = (firstName: string): void => {
    this.route.navigate([`success/${firstName}/${this.totalPrice}`]);
  }

  removeItem = (id: number): void => {
    let message: string = '';
    const storageProducts = this.productService.getCartProducts();
    const product = storageProducts.filter((product) => product.id === id)[0];
    const products = storageProducts.filter(
      (product: Product) => product.id !== id
    );
    this.productService.clearCart();
    this.productService.addToCart(products);
    message = `The product "${product!.name}" has been successfully removed from your cart.`;
    this.calculateTotal();
    alert(message);
    this.refresh();
  }

  onChangeOption = (value: string, product: Product): void => {
    const index = this.products.indexOf(product);
    this.products[index] = product;
    this.products[index].amount = value;
    this.productService.addToCart(this.products);
    this.calculateTotal();
    this.refresh();
  }

  refresh = (): void => {
    window.location.reload();
  }
}
