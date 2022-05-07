import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  productDetails!: Product[];
  public displayedColumns: string[] = ['name', 'description', 'price', 'action'];
  public dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  pageSize = 5;
  currentPage = 0;

  constructor(public service: ProductServiceService, public router: Router) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getdata();
  }

  getdata () {
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

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getdata();
  }
}
