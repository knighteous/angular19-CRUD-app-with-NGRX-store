import { createReducer, on } from '@ngrx/store'
import { Employee } from '../../models/employee.model'
import { onAddSuccess, onDeleteSuccess, onLoadSuccess, onUpdateSuccess } from './employee.actions'

export interface EmployeeState {
    employees: Employee[]
    employeeNew: Employee
    employeeEdit: Employee
}

export const initialState: EmployeeState = {
    employees: [],
    employeeNew: new Employee,
    employeeEdit: new Employee
}

export const employeeReducer = createReducer(
    initialState,
    on(onLoadSuccess, (state, {employees}) => ({
        ...state,
        employees: employees
    })),
    on(onAddSuccess, (state, {employeeNew}) => ({
        ...state,
        employeeNew: employeeNew,
        employeeEdit: new Employee
    })),
    on(onUpdateSuccess, (state, {employeeEdit}) => ({
        ...state,
        employeeEdit: employeeEdit,
        employeeNew: new Employee
    })),
    on(onDeleteSuccess, (state, {employee}) => ({
        ...state,
        employeeNew: employee,
        employeeEdit: employee
    }))
)