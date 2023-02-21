import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { SidebarComponent } from './profile-content/sidebar/sidebar.component';
import { EditUserComponent } from 'src/app/custom-components/profile/profile-content/edit-user/edit-user.component';

const routes: Routes = [
    {
      path: '',
      component: ProfileComponent, 
      children: [
        {
          path: 'main-info-edit',
          component: EditUserComponent
        }
      ]
    },
    {path:'', redirectTo: 'login', pathMatch: 'full'},
    {path:'**', component: ProfileComponent}
  ];

@NgModule({
  declarations: [
    ProfileComponent,
    UserInfoComponent,
    ProfileContentComponent,
    SidebarComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class ProfileModule { }
