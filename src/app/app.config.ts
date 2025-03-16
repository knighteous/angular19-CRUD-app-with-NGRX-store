import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { provideHttpClient } from '@angular/common/http'

import { routes } from './app.routes'
import { employeeReducer } from './store/employee/employee.reducer'
import { EmployeeEffects } from './store/employee/employee.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideStore({
      employee: employeeReducer,
    }),
    provideStoreDevtools(),
    provideEffects([
      EmployeeEffects
    ]),
    provideRouter(routes)
  ]
}
