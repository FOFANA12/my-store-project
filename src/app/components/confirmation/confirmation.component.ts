import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  firstName!: string | null;
  totalPrice!: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.firstName = params.get('firstName');
      this.totalPrice = Number(params.get('totalPrice'));
    });

    if (this.productService.getCartProducts().length > 0) {
      this.productService.clearCart();
    }
  }
}
