import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
