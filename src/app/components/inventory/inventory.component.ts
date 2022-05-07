import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  productDetails!: Product[];
  public displayedColumns: string[] = ['name', 'description', 'price', 'action'];
  public dataSource = new MatTableDataSource<Product>();

  constructor(public service: ProductServiceService, public router: Router) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe((data) => {
      this.productDetails = data;
      this.dataSource.data = data;
     });
  }

  editProduct (product: Product) {
    this.router.navigate(['update-product', product.id]);
  }

  deleteProduct (product: Product) {
    this.service.deleteProduct(product);
    this.service.getProducts().subscribe((data) => {
      this.dataSource.data = data;
    })
  }
}
