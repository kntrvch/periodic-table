import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { PeriodicTableService } from './services/periodic-table.service';
import { PeriodicElement } from './models/periodic-element';
import { RxState } from '@rx-angular/state';

function initializeApp(): () => Promise<void> {
  const periodicTableService = inject(PeriodicTableService);
  const state = inject(
    RxState<{ elements: PeriodicElement[]; filter: string }>
  );
  return () =>
    new Promise((resolve, reject) => {
      periodicTableService.getInitialElements().subscribe({
        next: (data) => {
          state.set({ elements: data, filter: '' });
          resolve();
        },
        error: reject,
      });
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    RxState,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
  ],
};
