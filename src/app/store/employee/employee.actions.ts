import { createAction, props } from '@ngrx/store'
import { Employee } from '../../models/employee.model'

export const onLoad = createAction(
    '[Employee] Load'
)

export const onLoadSuccess = createAction(
    '[Employee] Load success',
    props<{employees: Employee[]}>()
)

export const onAdd = createAction(
    '[Employee] Add',
    props<{empObj: any}>()
)

export const onAddSuccess = createAction(
    '[Employee] Add success',
    props<{employeeNew: Employee}>()
)

export const onUpdate = createAction(
    '[Employee] Update',
    props<{empObj: any, empid: String}>()
)

export const onUpdateSuccess = createAction(
    '[Employee] Update success',
    props<{employeeEdit: Employee}>()
)

export const onDelete = createAction(
    '[Employee] Delete',
    props<{empid: String}>()
)

export const onDeleteSuccess = createAction(
    '[Employee] Delete success',
    props<{employee: Employee}>()
)