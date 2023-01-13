import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'MyStore';
  products: Product[] = [];
  total: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.watchStorage().subscribe((data) => {
      this.products = data;
      this.calculate(this.products);
    });
  }

  calculate = (cart: Product[]): void => {
    this.total = 0;
    cart.forEach((item) => {
      this.total += (Number(item.amount) * Number(item.price));
    });
  }
}
