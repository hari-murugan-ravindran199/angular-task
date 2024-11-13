import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { naturalNumberValidator } from '../../validators/employee-form/employee-form.validators';


interface Employee {
  id: number; 
  name: string;
  age: number;
  empid: string;
  designation: string;
  address: string;
}

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent{

  isEditMode = false;
  employeeDataArray: Employee[] = [];
  displayedColumns = ['name', 'age', 'empid', 'designation', 'address', 'actions'];

  employeeDetails = new FormGroup({ 
    id: new FormControl(null),
    name: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
    age: new FormControl('',[Validators.required,Validators.min(18),Validators.max(99),naturalNumberValidator()]),
    empid: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(7)]),
    designation: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
    address: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
    
  });
   

  onSubmit() {
    if (this.employeeDetails.valid) {
      const newEmployee: Employee = this.employeeDetails.value;
  
      if (this.isEditMode) {
        const index = this.employeeDataArray.findIndex(e => e.id === newEmployee.id);
        if (index !== -1) {
          this.employeeDataArray = [
            ...this.employeeDataArray.slice(0, index),
            newEmployee,
            ...this.employeeDataArray.slice(index + 1)
          ];
        }
      } else {
        newEmployee.id = this.employeeDataArray.length > 0
          ? this.employeeDataArray[this.employeeDataArray.length - 1].id + 1
          : 1;
        this.employeeDataArray = [...this.employeeDataArray, newEmployee];
      }
  
      this.employeeDetails.reset();
       Object.keys(this.employeeDetails.controls).forEach(key => {
         this.employeeDetails.controls[key].setErrors(null)
       });
      this.isEditMode = false;
  
    } else {
      console.log('Invalid form data');
    }
  }
  

  editEmployee(employee: Employee) {
    //console.log(employee)
    this.employeeDetails.setValue({
      id: employee.id,
      name: employee.name,
      age: employee.age,
      empid: employee.empid,
      designation: employee.designation,
      address: employee.address
    });
    this.isEditMode = true;
  }
  
  deleteEmployee(employee: Employee) {
    if (confirm('Are you sure you want to delete this employee record?')) {
      this.employeeDataArray = this.employeeDataArray.filter(e => e.id !== employee.id);    
    }
  }
  

}
