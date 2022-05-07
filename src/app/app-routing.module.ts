import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './components/add-item/add-item.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { Error404Component } from './errorPages/error404/error404.component';

const routes: Routes = [
  { path: '', component:  AddItemComponent},
  { path: 'inventory', component: InventoryComponent },
  { path: 'update-product/:id', component: AddItemComponent },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
