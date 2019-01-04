import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CommentsConfirmComponent } from './comments-confirm/comments-confirm.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { DesignGameComponent } from './design-game/design-game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { StartGameComponent } from './start-game/start-game.component';
import { GameoverComponent } from './gameover/gameover.component';
import { PlayPageComponent } from './play-page/play-page.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { EventService } from './services/event.service';
import { FriendshipService } from './services/friendship.service';
import { CommentService } from './services/comment.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventsComponent,
    CommentsConfirmComponent,
    DesignGameComponent,
    LeaderboardComponent,
    ProfilePageComponent,
    EditProfileComponent,
    StartGameComponent,
    GameoverComponent,
    PlayPageComponent,
    UnauthorizedComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DatePipe, AuthService, FriendshipService, EventService, CommentService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
