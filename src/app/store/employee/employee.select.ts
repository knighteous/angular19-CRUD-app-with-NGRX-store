import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EmployeeState } from './employee.reducer'

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employee')

export const selectEmployees = createSelector(selectEmployeeState, state => state.employees)

export const selectEmployeeNew = createSelector(selectEmployeeState, state => state.employeeNew)

export const selectEmployeeEdit = createSelector(selectEmployeeState, state => state.employeeEdit)