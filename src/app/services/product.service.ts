import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private storage = window.localStorage;
  private URL: string = 'http://localhost:4200/assets/data.json';
  private storageSub = new Subject<string>();
  constructor(private httpClient: HttpClient) {}

  watchStorage(): Observable<Product[]> {
    const products = this.storage.getItem('products')
    return products ? of(JSON.parse(products)) : of([]);
  }


  getProductCount(){
    return ["1", "2", "3", "4", "5"];
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.URL);
  }

  addToCart(product: Product[]): void {
    this.storage.setItem('products', JSON.stringify(product));
    this.storageSub.next('added');
  }

  getCartProducts(): Product[] | []{
    const products = this.storage.getItem('products')
    return products? JSON.parse(products): [];
  }

  clearCart(): void{
    this.storage.clear();
    this.storageSub.next('clear');
  }

}
