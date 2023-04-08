import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { DirectionRegional } from 'src/app/auth/models/direction-regional-model';
import { DirectionRegionalService } from 'src/app/service/direction-regional.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DirectionRegionale } from 'src/app/models/direction-regional.model';

//import * as $ from 'jquery';

@Component({
  selector: 'app-get-direction-regional',
  templateUrl: './get-direction-regional.component.html',
  styleUrls: ['./get-direction-regional.component.scss']
})


export class GetDirectionRegionalComponent implements OnInit {
  LdirectionRegionals: DirectionRegionale[] = [];

  updateDirectionForm = new FormGroup({
    codeDirection: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    libelleDirection: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    lieuArchive : new FormControl("",Validators.required),
    lieuArchiveSecAge : new FormControl("",Validators.required),
  })


  @ViewChild('updateModal') updateModal!: ElementRef;
  directionRegionals: DirectionRegional[] = [];
  selectedDirectionRegional: any = {
    codeDirection: '',
    libelleDirection: '',
    lieuArchive: '',
    lieuArchiveSecAge: ''
  }; 
  renderer: any;
  constructor(private directionRegionalService: DirectionRegionalService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDirectionRegionals();
  }
  getDirectionRegionals(): void {
    this.directionRegionalService
      .getAllDirectionRegional()
      .subscribe((data: DirectionRegional[]) => {
        this.directionRegionals = data;
      });
  }
  deleteDirectionRegional(codeDirection: string) {
    if (confirm('Are you sure you want to delete this Direction Regional?')) {
      this.directionRegionalService.deleteDirectionRegional(codeDirection).subscribe(() => {
        // Reload the list of Direction Regionals after deleting
        this.getDirectionRegionals();
      });
    }
  }

  openUpdateModal(direction: any) {
    this.selectedDirectionRegional = { ...direction };
    const updateModalElement = document.getElementById('updateModal');
    if (updateModalElement) {
      const updateModal = new Modal(updateModalElement as HTMLElement);
      updateModal.show();
    } else {
      console.error('Update modal element not found');
    }
  }

/*
  updateDirectionRegional(updatedDirection: DirectionRegional): void {
    this.directionRegionalService.updateDirectionRegional(updatedDirection).subscribe(() => {
      // Reload the list of Direction Regionals after updating
      this.getDirectionRegionals();
})}
*/

showAlert(message: string, alertType: 'success' | 'warning' | 'danger'): void {
  const alertContainer = document.getElementById('alert-container');
  if (alertContainer) {
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', `alert-${alertType}`);
    alertElement.setAttribute('role', 'alert');
    alertElement.innerText = message;
    alertContainer.appendChild(alertElement);

    // Automatically remove the alert after 5 seconds
    setTimeout(() => {
      alertContainer.removeChild(alertElement);
    }, 5000);
  } else {
    console.error('Alert container element not found');
  }
}

updateDirectionRegional(updatedDirection: DirectionRegional): void {
  this.directionRegionalService.updateDirectionRegional(updatedDirection).subscribe(
    (updatedDirectionRegional) => {
      if (updatedDirectionRegional && typeof updatedDirectionRegional === 'object') {
        const updateModalElement = document.getElementById('updateModal');
        if (updateModalElement) {
          const updateModal = new Modal(updateModalElement as HTMLElement);
          updateModal.hide();
        } else {
          console.error('Update modal element not found');
        }

        // Show a success alert
        this.showAlert('Direction Regional updated successfully.', 'success');

        this.getDirectionRegionals();
      } else {
        // Show a danger alert
        this.showAlert('An error occurred while updating the Direction Regional.', 'danger');
      }
    },
    (error) => {
      // Handle error case
      this.showAlert('An error occurred while updating the Direction Regional.', 'danger');
      console.error(error);
    }
  );
}
onSubmit(){
  if(this.updateDirectionForm.valid){
    const value = this.updateDirectionForm.value;
    this.directionRegionalService.updateDirectionRegional(value as DirectionRegional ).subscribe({
      next:() =>{
        this.showAlert('Direction Regional updated successfully.', 'success');
      },
      error : error=> {
        this.showAlert('An error occurred while updating the Direction Regional.', 'danger');
      console.error(error);
      }
    }) 
  }
}

}