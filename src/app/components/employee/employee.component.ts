import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http'
import { AsyncPipe } from '@angular/common'
import { EmployeeService } from '../../services/employee.service'
import { Employee } from '../../models/employee.model'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { selectEmployeeEdit, selectEmployeeNew, selectEmployees } from '../../store/employee/employee.select'
import { onAdd, onAddSuccess, onDelete, onDeleteSuccess, onLoad, onLoadSuccess, onUpdate, onUpdateSuccess } from '../../store/employee/employee.actions'

@Component({
  selector: 'app-employee',
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
  es: EmployeeService = inject(EmployeeService)
  fb: FormBuilder = inject(FormBuilder)

  store: Store = inject(Store)

  // employees: Employee[] = []
  // employeeNew: Employee = new Employee
  // employeeEdit: Employee = new Employee

  employees$: Observable<Employee[]> = this.store.select(selectEmployees)
  employeeNew$: Observable<Employee> = this.store.select(selectEmployeeNew)
  employeeEdit$: Observable<Employee> = this.store.select(selectEmployeeEdit)
  
  empForm!: FormGroup
  empid: String = ''

  constructor() {}

  ngOnInit(): void {
    this.empForm = this.fb.group({
      fullname: [''],
      phone: [''],
      email: ['']
    })

    // this.onLoad()
    this.store.dispatch(onLoad())
  }

  // onLoad(): void {
  //   this.es.onLoad().subscribe({
  //     next: (res: Employee[]) => {
  //       // this.employees = res

  //       this.store.dispatch(onLoadSuccess({employees: res}))
  //     },
  //     error: (err: HttpErrorResponse) => console.table([err]),
  //     complete: () => {}
  //   })
  // }

  onAdd(): void {
    if(this.empForm.value.fullname === '' || this.empForm.value.phone === '' || this.empForm.value.email === '') {
      return
    }

    const empObj = {
      fullname: this.empForm.value.fullname,
      phone: this.empForm.value.phone,
      email: this.empForm.value.email
    }

    // this.es.onAdd(empObj).subscribe({
    //   next: (res: Employee) => {
    //     // this.employeeNew = res
    //     // this.employeeEdit = new Employee

    //     this.store.dispatch(onAddSuccess({employeeNew: res}))
    //   },
    //   error: (err: HttpErrorResponse) => console.table([err]),
    //   complete: () => {
    //     this.onCloseModal()
    //     this.onResetForm()
    //     // this.onLoad()
    //     this.store.dispatch(onLoad())
    //   }
    // })

    this.store.dispatch(onAdd({empObj}))
    this.onCloseModal()
    this.onResetForm()
    this.store.dispatch(onLoad())

  }

  onUpdate(): void {
    if(this.empForm.value.fullname === '' || this.empForm.value.phone === '' || this.empForm.value.email === '') {
      return
    }

    const empObj = {
      fullname: this.empForm.value.fullname,
      phone: this.empForm.value.phone,
      email: this.empForm.value.email
    }

    // this.es.onUpdate(empObj, this.empid).subscribe({
    //   next: (res: Employee) => {
    //     // this.employeeEdit = res
    //     // this.employeeNew = new Employee

    //     this.store.dispatch(onUpdateSuccess({employeeEdit: res}))
    //   },
    //   error: (err: HttpErrorResponse) => console.table([err]),
    //   complete: () => {
    //     this.onCloseModal()
    //     this.onResetForm()
    //     // this.onLoad()
    //     this.store.dispatch(onLoad())
    //   }
    // })

    this.store.dispatch(onUpdate({empObj, empid: this.empid}))
    this.onCloseModal()
    this.onResetForm()
    this.store.dispatch(onLoad())
  }

  onDelete(empid: String): void {
    // this.es.onDelete(empid).subscribe({
    //   next: (res: Employee) => {
    //     // this.employeeNew = res
    //     // this.employeeEdit = res

    //     this.store.dispatch(onDeleteSuccess({employee: res}))
    //   },
    //   error: (err: HttpErrorResponse) => console.table([err]),
    //   complete: () => {
    //     this.onResetForm()
    //     // this.onLoad()
    //     this.store.dispatch(onLoad())
    //   }
    // })

    this.store.dispatch(onDelete({empid: empid}))
    this.onResetForm()
    this.store.dispatch(onLoad())
  }

  onUpdateCta(employee: Employee): void {
    this.empForm.controls['fullname'].setValue(employee.fullname)
    this.empForm.controls['phone'].setValue(employee.phone)
    this.empForm.controls['email'].setValue(employee.email)

    this.empid = employee.id
  }

  onResetForm(): void {
    //this.empForm.reset()

    this.empForm.controls['fullname'].setValue('')
    this.empForm.controls['phone'].setValue('')
    this.empForm.controls['email'].setValue('')

    this.empid = ''
  }

  onCloseModal(): void {
    const btnclose = document.getElementById('btn-close')
    btnclose?.click()
  }

}
