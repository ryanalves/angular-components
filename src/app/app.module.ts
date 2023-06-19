import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowcaseModule } from './showcase/showcase.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ComponentListComponent } from './component-list/component-list.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ShowcaseModule,
    SidebarModule,
    ButtonModule,
  ],
  declarations: [AppComponent, ComponentListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
