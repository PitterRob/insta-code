import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';

import { firebaseConfig } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-clone';
  ngOnInit(): void {
    firebase.initializeApp(firebaseConfig);
  }
}
