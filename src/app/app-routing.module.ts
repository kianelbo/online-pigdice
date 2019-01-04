import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommentsConfirmComponent } from './comments-confirm/comments-confirm.component';
import { DesignGameComponent } from './design-game/design-game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { StartGameComponent } from './start-game/start-game.component';
import { GameoverComponent } from './gameover/gameover.component';
import { PlayPageComponent } from './play-page/play-page.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-page', component: CommentsConfirmComponent, canActivate: [AdminGuard] },
  { path: 'design', component: DesignGameComponent, canActivate: [AuthGuard] },
  { path: 'users', component: LeaderboardComponent, canActivate: [AuthGuard] },
  { path: 'users/:username', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'editprofile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'start', component: StartGameComponent },
  { path: 'gameover', component: GameoverComponent },
  { path: 'play', component: PlayPageComponent },
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
