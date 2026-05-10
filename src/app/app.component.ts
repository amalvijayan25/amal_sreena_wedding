import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Amal & Sreena';
  googleDriveUploadUrl = 'https://drive.google.com/drive/folders/YOUR_GOOGLE_DRIVE_FOLDER_ID?usp=sharing';
  weddingMapUrl = 'https://maps.app.goo.gl/CzY9825VpdgCGL8A7';
  receptionMapUrl = 'https://maps.app.goo.gl/XPcDztG8t2naX65r8';
  countdownDays: number=0;
  countdownHours: number=0;
  private countdownInterval: any;

  wedding = {
    date: 'Friday, 28 August 2026',
    time: '12:25 PM - 1:30 PM',
    location: '<strong>Hill Palace Auditorium</strong>, <small>Chembra, Palakkad</small>'
  };
  reception = {
    date: 'Saturday, 29 August 2026',
    time: '4:00 PM - 9:00 PM',
    location: '<strong>Indrapuri Auditorium</strong>, <small>Thiruvananthapuram</small>'
  };

  constructor() {
    this.calculateCountdown();
  }

  ngOnInit() {
    this.countdownInterval = setInterval(() => {
      this.calculateCountdown();
    }, 1000);
  }

  calculateCountdown() {
    const weddingDate = new Date('2026-08-28T12:25:00');
    const now = new Date();
    const diffMs = weddingDate.getTime() - now.getTime();
    this.countdownDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    this.countdownHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
