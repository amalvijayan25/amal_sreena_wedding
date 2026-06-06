import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  protected readonly title = signal('Amal & Sreena Wedding');
  weddingPhotoAlbumUrl = 'https://drive.google.com/drive/folders/1V3EAN7okP-FnAz0YSlyxYMuQ_GGpqOV7?usp=sharing';
  receptionPhotoAlbumUrl = 'https://drive.google.com/drive/folders/1M_r5AcDbnNK8X1H_zsM9ve1F6XOVSwec?usp=sharing';
  weddingMapUrl = 'https://maps.app.goo.gl/CzY9825VpdgCGL8A7';
  receptionMapUrl = 'https://maps.app.goo.gl/XPcDztG8t2naX65r8';

  // TODO: replace with the couple's real WhatsApp number (country code + number, no +, spaces or dashes)
  contactPhone = '918089655197';

  weddingCalUrl = '';
  receptionCalUrl = '';

  countdownDays = signal(0);
  countdownHours = signal(0);
  countdownMinutes = signal(0);
  countdownSeconds = signal(0);
  private countdownInterval: any;
  private observer?: IntersectionObserver;

  wedding = {
    date: 'Friday, 28 August 2026',
    time: '12:25 PM – 1:30 PM',
    venue: 'Hill Palace Auditorium',
    place: 'Chembra, Palakkad'
  };
  reception = {
    date: 'Saturday, 29 August 2026',
    time: '4:00 PM – 9:00 PM',
    venue: 'Indrapuri Auditorium',
    place: 'Attukal, Thiruvananthapuram'
  };

  dressColors = [
    { name: 'Olive', hex: '#d0c984' },
    { name: 'Lavender', hex: '#f4bbff' },
    { name: 'Gold', hex: '#d4af37' },
    { name: 'Ivory', hex: '#f5efe0' },
    { name: 'Pink', hex: '#f9a09b' },
    { name: 'Aqua', hex: '#a7dce6' },
  ];

  rsvp = { name: '', attending: 'yes', events: 'both', guests: 1, message: '' };

  // UTC times (IST −5:30) so calendars are unambiguous on every device
  private events = {
    wedding: {
      title: 'Amal & Sreena — Wedding Ceremony',
      startUtc: '20260828T065500Z', endUtc: '20260828T080000Z',
      startLocal: '20260828T122500', endLocal: '20260828T133000',
      location: 'Hill Palace Auditorium, Chembra, Palakkad',
      details: 'Join us as Amal & Sreena tie the sacred knot. We would be honoured to have you there.'
    },
    reception: {
      title: 'Amal & Sreena — Reception Party',
      startUtc: '20260829T103000Z', endUtc: '20260829T153000Z',
      startLocal: '20260829T160000', endLocal: '20260829T210000',
      location: 'Indrapuri Auditorium, Attukal, Thiruvananthapuram',
      details: 'On the next evening, we are hosting a party with great food and company.'
    }
  };

  constructor(private host: ElementRef<HTMLElement>) {
    this.weddingCalUrl = this.buildGoogleCalUrl(this.events.wedding);
    this.receptionCalUrl = this.buildGoogleCalUrl(this.events.reception);
    this.calculateCountdown();
  }

  ngOnInit() {
    this.countdownInterval = setInterval(() => this.calculateCountdown(), 1000);
  }

  ngAfterViewInit() {
    const els = this.host.nativeElement.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    this.observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => this.observer!.observe(el));
  }

  private buildGoogleCalUrl(e: { title: string; startLocal: string; endLocal: string; location: string; details: string }): string {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: e.title,
      dates: `${e.startLocal}/${e.endLocal}`,
      ctz: 'Asia/Kolkata',
      location: e.location,
      details: e.details
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  submitRsvp() {
    const r = this.rsvp;
    const attending = r.attending === 'yes' ? 'Joyfully accepts ✅' : 'Regretfully declines';
    const eventLabels: { [key: string]: string } = {
      both: 'Wedding Ceremony & Reception',
      wedding: 'Wedding Ceremony only',
      reception: 'Reception only'
    };
    const lines = [
      '💍 RSVP — Amal & Sreena Wedding',
      '',
      `Name: ${r.name || '(not given)'}`,
      `Response: ${attending}`,
      `Attending: ${eventLabels[r.events] || r.events}`,
      `Guests: ${r.guests}`,
      r.message ? `Message: ${r.message}` : ''
    ].filter(Boolean);
    const url = `https://wa.me/${this.contactPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank');
  }

  calculateCountdown() {
    const weddingDate = new Date('2026-08-28T12:25:00');
    const diffMs = weddingDate.getTime() - new Date().getTime();
    const clamped = Math.max(diffMs, 0);
    this.countdownDays.set(Math.floor(clamped / (1000 * 60 * 60 * 24)));
    this.countdownHours.set(Math.floor((clamped % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.countdownMinutes.set(Math.floor((clamped % (1000 * 60 * 60)) / (1000 * 60)));
    this.countdownSeconds.set(Math.floor((clamped % (1000 * 60)) / 1000));
  }
  enableUploadButton() {
    return new Date() < new Date('2026-08-01T00:00:00');
  }
  activeFileLocation() {
    const now = new Date();
    const weddingDate = new Date('2026-08-28T12:25:00');
    // const receptionDate = new Date('2026-08-29T16:00:00');
    if (now < weddingDate) {
      return this.weddingPhotoAlbumUrl;
    } else {
      return this.receptionPhotoAlbumUrl;
    }
  }
  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.observer?.disconnect();
  }
}
