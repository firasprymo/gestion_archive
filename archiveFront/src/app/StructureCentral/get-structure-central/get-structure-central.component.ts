import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StructureCentral } from 'src/app/models/structure-central.model';
import { StructureCentralService } from 'src/app/service/structure-central.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-get-structure-central',
  templateUrl: './get-structure-central.component.html',
  styleUrls: ['./get-structure-central.component.scss']
})
export class GetStructureCentralComponent implements OnInit {
  structureCentrals: StructureCentral[] = [];
  updateForm!: FormGroup;
  selectedStructure!: StructureCentral;
  @ViewChild('updateModal', { static: false }) updateModal!: ModalDirective;
  constructor(private structureCentralService: StructureCentralService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getStructureCentrals();
    this.updateForm = this.formBuilder.group({
      codeStructure: [{value: '', disabled: true}, Validators.required],
      libelleStructure: ['', Validators.required],
      lieuArchive: ['', Validators.required],
      lieuArchiveSecAge: ['', Validators.required],
    });
  }


  getStructureCentrals(): void {
    this.structureCentralService.
    getAllStructureCentral()
    .subscribe((data:StructureCentral[])=>{
      this.structureCentrals= data;
    })
  }

  deleteStructureCentral(codeStructure: string){
    if(confirm('est vous sure de supprimer cette Structure Central ? ')){
      this.structureCentralService.deleteStructureCentral(codeStructure).subscribe(()=>{
        this.getStructureCentrals();
      })
    }
  }
  openUpdateModal(structure: StructureCentral): void {
    this.selectedStructure = Object.assign({}, structure);
    this.updateForm.patchValue(this.selectedStructure);
    this.updateModal.show();
  }

  updateStructureCentral(): void {
    if (this.updateForm.valid) {
      const updatedStructure: StructureCentral = Object.assign(this.selectedStructure, this.updateForm.getRawValue());
      this.structureCentralService.updateStructureCentral(updatedStructure).subscribe(() => {
        this.getStructureCentrals();
        this.updateModal.hide();
      });
    }
  }
  closeModal() {
    this.updateModal.hide();
  }
  

}
