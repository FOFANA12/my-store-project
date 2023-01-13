import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem!: Product;
  selectedOption: string = '';
  productCount: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productCount = this.productService.getProductCount();

    const currentProducts: Product[] = this.productService.getCartProducts();
    const productInCart = currentProducts.find(
      (p) => p.id === this.productItem.id
    );
    this.selectedOption = productInCart ? productInCart.amount : '';
  }

  onChangeOption = (value: string): void => {
    this.selectedOption = value;
  }

  addProductToCart = (product: Product): void => {
    let message: string = '';
    if(!this.selectedOption){
      message = 'Please select a quantity';
      alert(message);
      return
    }

    const currentProducts: Product[] = this.productService.getCartProducts();
    const productInCart = currentProducts.find((p) => p.id === product.id);
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
