import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  
  productData = new Subject<Product[]>();
  data: Product[] = []

  constructor() { 
    this.data = [
      {
      id: 1,
      name: 'Autumn Flock High Heel Sandals',
      description: 'Marilyn Monroe once said, “Give a girl right shoes and she will conquer the world”.',
      price: 200
    },
      {
      id: 2,
      name: 'Platform Gladiator Sandals',
      description: 'Gladiator Sandals, a flat sandal with several wide cross straps holding the sole to the foot and with a solitary strap.',
      price: 400
    },
      {
      id: 3,
      name: 'Low Heels Summer Sandals',
      description: 'These black closed-toe sandals will make you look exotic and will bring a great feeling of true confidence.',
      price: 350
    },
      {
      id: 4,
      name: 'High-Heeled Open-toed Sandals',
      description: 'These red high heel open-toed sandals will make you look bewitching and exquisite.',
      price: 550
    },
      {
      id: 5,
      name: 'Sandal Shoes',
      description: 'These white open sandals shoes give you all the comfort of sandals but with the cushioning support of a running shoe.',
      price: 750
    },
  ]
  }

  // function to get the products.
  getProducts () {
    return of(this.data);
  }

  // function to add new product into the array.
  addProduct (data: Product) {
    data.id = new Date().getTime();
    this.data.push(data);
    // console.log(this.data);
    
    this.productData.next([...this.data]);
  }

  //function to get a product by id.
  getProductById(id: number) {
    return this.data.find(x => x.id == id)
  }

  //function to update product details.
  updateProduct (data: Product) {
    const userIndex = this.data.findIndex(x => x.id == data.id);
    if (userIndex != null && userIndex != undefined) {
      this.data[userIndex] = data;
    }
    this.productData.next([...this.data]);
  }

   // function to delete product.
   deleteProduct (data: Product) {
    const index = this.data.findIndex(currentObj => currentObj.id === data.id);
    this.data.splice(index, 1);
    this.productData.next([...this.data]);
  }

}
