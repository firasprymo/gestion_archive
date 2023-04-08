import { Component, OnInit } from '@angular/core';
import { DirectionRegionalService } from 'src/app/service/direction-regional.service';
import { DirectionRegionale } from 'src/app/models/direction-regional.model';
import { Modal } from 'bootstrap';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-direction-regional',
  templateUrl: './add-direction-regional.component.html',
  styleUrls: ['./add-direction-regional.component.scss']
})
export class AddDirectionRegionalComponent implements OnInit {
  newDirectionRegional: DirectionRegionale = new DirectionRegionale();

  constructor(private directionRegionalService: DirectionRegionalService) { }

  ngOnInit(): void {
  }
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

  createDirectionRegional(createForm: NgForm): void {
    // Check if the form is invalid
    if (createForm.invalid) {
      this.showAlert('The form is invalid. Please check the input fields.', 'danger');
      return;
    }
    this.newDirectionRegional.codeDirection = 'DR' + this.newDirectionRegional.codeDirection;

    this.directionRegionalService.createDirectionRegional(this.newDirectionRegional).subscribe(
      () => {
        // Close the modal
        const createModalElement = document.getElementById('createModal');
        if (createModalElement) {
          const createModal = new Modal(createModalElement as HTMLElement);
          createModal.hide();
        } else {
          console.error('Create modal element not found');
        }
        
        this.showAlert('Direction Regional added successfully.', 'success');
        this.directionRegionalService.getAllDirectionRegional().subscribe(
          (directionRegionals) => {
            this.directionRegionalService.setDirectionRegionals(directionRegionals);
          }
        );
      },
      (error) => {
        // Check if the error is due to the Direction Regional already existing
        if (error.error.message.includes('Direction Regional avec le Code')) {
          this.showAlert('Direction Regional already exists.', 'danger');
        } else {
          this.showAlert('An error occurred while adding the Direction Regional.', 'danger');
        }
      }
    );
  }
  

  openCreateDirectionModal() {
    
    const createModalElement = document.getElementById('createModal');
    if (createModalElement) {
      const createModal = new Modal(createModalElement as HTMLElement);
      createModal.show();
    } else {
      console.error('create modal element not found');
    }
  }




// ...




}
