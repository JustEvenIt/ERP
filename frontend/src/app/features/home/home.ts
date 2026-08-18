import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
