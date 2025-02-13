import { Component } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormlyModule, FormlyFieldConfig } from "@ngx-formly/core";
import { CommonModule } from "@angular/common";
import { NZ_MODAL_DATA, NzModalRef } from "ng-zorro-antd/modal";
import { Inject } from "@angular/core";

@Component({
  selector: "app-edit-task-modal",
  standalone: true,
  imports: [FormlyModule, ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="editTaskForm">
      <formly-form
        [form]="editTaskForm"
        [model]="editTaskModel"
        [fields]="editTaskFields"
      ></formly-form>
    </form>
  `,
})
export class EditTaskModalComponent {
  editTaskForm = new FormGroup({});
  editTaskModel: any;
  editTaskFields: FormlyFieldConfig[] = [
    {
      key: "title",
      type: "input",
      props: {
        placeholder: "Enter Title",
        required: true,
      },
    },
    {
      key: "description",
      type: "textarea",
      props: {
        placeholder: "Enter Description",
        required: true,
      },
    },
  ];

  constructor(
    private modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: any,
  ) {
    this.editTaskModel = { ...data.task };
  }

  onSubmit() {
    if (this.editTaskForm.valid) {
      this.modalRef.close(this.editTaskModel);
    }
  }
}
