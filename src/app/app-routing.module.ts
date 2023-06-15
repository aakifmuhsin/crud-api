import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ReaduserComponent } from './readuser/readuser.component';
import { FilterComponent } from './filter/filter.component';
const routes: Routes = [
  { path: 'userdata', component: ReaduserComponent },
  { path: 'newuser', component: CreateComponent },
  { path: 'updatedata', component: UpdateComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'deletedata', component: DeleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
