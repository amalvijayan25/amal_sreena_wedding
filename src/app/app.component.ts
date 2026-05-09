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
  wedding = {
    date: 'Saturday, 20 July 2026',
    time: '5:00 PM',
    location: 'Blue Lotus Garden, Chennai'
  };
  reception = {
    date: 'Sunday, 21 July 2026',
    time: '7:00 PM',
    location: 'Neon Ballroom, Starview Convention Center, Chennai'
  };
}
