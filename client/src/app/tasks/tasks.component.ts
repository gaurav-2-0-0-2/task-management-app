import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormGroup } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyNgZorroAntdModule } from "@ngx-formly/ng-zorro-antd";
import { HttpClient } from "@angular/common/http";
import { NzModalService } from "ng-zorro-antd/modal";
import { EditTaskModalComponent } from "./edit-task-modal.component"; // Import modal component

interface ITask {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [
    CommonModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyNgZorroAntdModule,
  ],
  providers: [NzModalService],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.css",
})
export class TasksComponent implements OnInit {
  authenticated: boolean = false;
  tasks: ITask[] = [];
  isModalOpen: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly httpClient: HttpClient,
    private router: Router,
    private modalService: NzModalService,
  ) {
    this.model = { userId: Number(this.authService.getUserId()!) };
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authenticated = true;
      this.fetchTasks();
    } else {
      this.router.navigate(["/login"]);
    }
  }

  createTaskForm = new FormGroup({});
  model: any;
  // Custom Formly fields for creating a task
  fields: FormlyFieldConfig[] = [
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

  onSubmit(model: any) {
    if (this.createTaskForm.valid) {
      //console.log(model);
      this.httpClient
        .post("http://localhost:5000/task/create", model)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.tasks = [...this.tasks, data]; // Add the new task to the existing list
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    }
  }

  // use an observable instead
  fetchTasks(): any {
    this.httpClient
      .get(`http://localhost:5000/task/all/${this.model.userId}`)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.tasks = data;
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }

  onEdit(task: ITask): void {
    const modalRef = this.modalService.create({
      nzTitle: "Edit Task",
      nzContent: EditTaskModalComponent,
      nzData: {
        task: task,
      },
      nzOnOk: (): any => {
        const instance = modalRef.getContentComponent();
        if (instance && instance.editTaskForm.valid) {
          return this.onSubmitEditTask(instance.editTaskModel);
        }
        return false; // Prevent modal from closing if form is invalid
      },
    });
  
    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.onSubmitEditTask(result);
      }
    });
  }

  onSubmitEditTask(model: any) {
    this.httpClient
      .put(`http://localhost:5000/task/update/${model.id}`, model)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.tasks = this.tasks.map((task) =>
            task.id === model.id ? { ...task, ...model } : task,
          );
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }
  // Code for Modal that opens up when edit button is clicked ends here

  onDelete(taskId: number): void {
    this.httpClient
      .delete(`http://localhost:5000/task/delete/${taskId}`)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }

  markCompleted(taskId: number): void {
    this.httpClient
      .put(`http://localhost:5000/task/completed/${taskId}`, {})
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.tasks = this.tasks.map((task) => {
            if (task.id === taskId) {
              task.status = "completed";
            }
            return task;
          });
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }
}
