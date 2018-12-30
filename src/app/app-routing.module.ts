import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {IndexComponent} from './index/index.component';
import {EventsComponent} from './events/events.component';
import {LoginComponent} from './login/login.component';
import {SpecialEventsComponent} from './special-events/special-events.component';
import {RegisterComponent} from './register/register.component';
import {CommentsConfirmComponent} from './comments-confirm/comments-confirm.component';
import {DesignGameComponent} from './design-game/design-game.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {StartGameComponent} from './start-game/start-game.component';

import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'events', component: EventsComponent },
  { path: 'special', component: SpecialEventsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'commentsconfirm', component: CommentsConfirmComponent },
  { path: 'design', component: DesignGameComponent },
  { path: 'users', component: LeaderboardComponent },
  { path: 'users/:username', component: ProfilePageComponent },
  { path: 'editprofile', component: EditProfileComponent },
  { path: 'start', component: StartGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
