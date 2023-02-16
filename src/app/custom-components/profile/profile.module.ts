import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { ContentComponent } from './profile-content/content/content.component';
import { SidebarComponent } from './profile-content/sidebar/sidebar.component';

const routes: Routes = [
    {
      path: '',
      component: ProfileComponent, 
    },
    {path:'', redirectTo: 'login', pathMatch: 'full'},
    {path:'**', component: ProfileComponent}
  ];

@NgModule({
  declarations: [
    ProfileComponent,
    UserInfoComponent,
    ProfileContentComponent,
    ContentComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class ProfileModule { }
