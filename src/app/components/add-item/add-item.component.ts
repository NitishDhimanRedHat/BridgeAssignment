import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  
  productForm!: FormGroup;
  submitted: boolean = false;
  message: string = '';
  id: number = 0;

  constructor(private service: ProductServiceService, private fb: FormBuilder, public router: Router, public route: ActivatedRoute) { 
    this.productForm = this.fb.group({
      id: [0, [Validators.required]],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['id'] != null) {
        this.productForm.get('id')?.setValue(params['id']);
        const data = this.service.getProductById(this.id);
        if (data) {
          console.log(data);
          this.productForm.setValue(data);
        }
      }
    });
  }

  get form() { return this.productForm.controls; }

  onSubmit () {

    this.submitted = true;
    if(this.productForm.invalid){
      return;
    }
    if (this.productForm.get('id')?.value === 0) {
      // on Create New User
      this.service.addProduct(this.productForm.value);
    } else {
      // on Update User info
      this.service.updateProduct(this.productForm.value);
    }
    
    this.message = 'Product has been registered.';
    this.productForm.reset();
    this.router.navigate(['/inventory']);
    
  }
  
  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }


}
