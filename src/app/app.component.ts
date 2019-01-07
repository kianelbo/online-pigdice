import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatchMakerComponent } from './match-maker/match-maker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myProfile: String;
  componentRef: any;
  @ViewChild('queueModalContainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private authService: AuthService,
              private router: Router,
              private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.myProfile = '/users/' + this.authService.getSelfUsername();
  }

  createMatchMakerModal(mode, gameName) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(MatchMakerComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.selfRef = this.componentRef;
    this.componentRef.instance.mode = mode;
    this.componentRef.instance.gameName = gameName;
  }
}
