import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate : [AuthGuard]

  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate : [AuthGuard]

  },
  {
    path: 'my-blogs',
    component: MyBlogsComponent,
    canActivate : [AuthGuard]

  },
  {
    path: 'all-blogs',
    component: AllBlogsComponent
  },
  {
    path: 'post-blog',
    component : PostBlogComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'events',
    component : EventsComponent
  },
  {
    path:'special-events',
    component : SpecialEventsComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'register',
    component : RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
