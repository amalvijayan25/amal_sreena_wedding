import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Amal & Sreena';
  googleDriveUploadUrl = 'https://drive.google.com/drive/folders/YOUR_GOOGLE_DRIVE_FOLDER_ID?usp=sharing';
  weddingMapUrl = 'https://maps.app.goo.gl/CzY9825VpdgCGL8A7';
  receptionMapUrl = 'https://maps.app.goo.gl/XPcDztG8t2naX65r8';
  wedding = {
    date: 'Friday, 28 August 2026',
    time: '5:00 PM',
    location: 'Blue Lotus Garden, Chennai'
  };
  reception = {
    date: 'Saturday, 29 August 2026',
    time: '7:00 PM',
    location: 'Neon Ballroom, Starview Convention Center, Chennai'
  };
}
