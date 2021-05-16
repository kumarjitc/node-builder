
import { MatDialog } from '@angular/material/dialog';
import { Socket, io } from 'socket.io-client';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper'

import { HttpService } from '@services/http.service';
import { IWorkflow, IHttpServiceParams, IConfigList, IHttpCollection } from '@commons/structures';
import { Constants } from '@commons/constants';
import { forkJoin, Observable } from 'rxjs';
import { ISocketMessage } from '@commons/structures';
import { CredentialsComponent } from '@components/credentials/credentials.component';

@Component({
  selector: 'app-workflow-status',
  templateUrl: './workflow-status.component.html',
  styleUrls: ['./workflow-status.component.css'],
  providers: [
    HttpService,
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } }
  ]
})
export class WorkflowStatusComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') private workflowSteps: MatStepper;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public isLinear: boolean = true;
  public workflow: IWorkflow;
  public build: Array<IConfigList>;
  public completedIndex: number = -1;
  public messages: Array<ISocketMessage>;

  public readonly buildStatus: Array<string> = Constants.BUILD_STATUS_VALUES;

  private socket: Socket;

  constructor(private _formBuilder: FormBuilder,
    private http: HttpService<any>,
    public dialog: MatDialog) {
    this.build = [];
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    let id: string = '1OCevlJOXtGGRIzl';
    let params: IHttpServiceParams<Record<string, string>> = {
      url: Constants.WORKFLOW_URL + `/id/${id}`
    };

    this.http
      .doGet(params)
      .then(data => {
        this.workflow = data;
        this.composeBuildSteps();
      })
      .catch(error => {
        console.error(error);
      });
  }

  private composeBuildSteps(): void {
    this.fetchStepDetails().subscribe(data => {
      Object.keys(data).forEach(step => {
        this.build.push(data[step]);
      });
      //console.log(this.build);
      this.executeWorkflow();
    }, error => {
      console.log(error);
    });
  }

  private fetchStepDetails(): Observable<Array<IConfigList>> {
    let httpCollection: IHttpCollection = {};
    this.workflow.steps.forEach((item, index) => {
      let params: IHttpServiceParams<Record<string, string>> = {
        url: Constants.CONFIG_URL + `/id/${item.step}`
      };
      httpCollection['STEP' + index] = this.http.doGet(params);
    });

    return forkJoin(httpCollection);
  }

  private executeWorkflow(): void {
    const step: IConfigList = this.build[++this.completedIndex];
    switch (step.type) {
      case 'pull':
        this.openDialog(step);
        break;
      default:
        this.runBuild(step);
        break;
    }
  }

  private runBuild(step: IConfigList, inputs: Record<string, string> = {}): void {
    let params: IHttpServiceParams<Record<string, string>> = {
      url: Constants.BUILD_URL + `/id/${step['_id']}`,
      formData: inputs
    };

    this.http
      .doPost(params)
      .then(data => {
        this.getStatus(step);
      })
      .catch(error => {
        console.error(error);
      });
  }

  private getStatus(step: IConfigList): void {
    step[Constants.BUILD_MESSAGES_KEY] = [];

    this.socket = io('http://localhost:8001', {
      path: '/build/status'
    });
    this.socket.on('progress', (message) => {
      this.logMessage(message, step);
    });
    this.socket.on('message', (message) => {
      step[Constants.BUILD_STATUS_KEY] = this.buildStatus[1];
      this.logMessage(message, step);
    });
    this.socket.on('error', (message) => {
      step[Constants.BUILD_STATUS_KEY] = this.buildStatus[2];;
      this.logMessage(message, step);
    });
    this.socket.on('completed', (message) => {
      step[Constants.BUILD_STATUS_KEY] = this.buildStatus[0];
      this.logMessage(message, step);
      this.gotoNextStep();
    });
    this.socket.on('started', (message) => {
      this.logMessage(message, step);
    });
  }

  private logMessage(message: ISocketMessage, step: IConfigList): void {
    step[Constants.BUILD_MESSAGES_KEY].push(message);
  }

  private openDialog(step: IConfigList): void {
    const dialogRef = this.dialog.open(CredentialsComponent, {
      width: '300px',
      data: { userName: '', password: '' }
    });

    dialogRef.afterClosed().subscribe(inputs => {
      if (inputs.username && inputs.password && step['_id']) {
        this.runBuild(step, inputs);
      }
    });
  }

  private gotoNextStep(): void {
    if (this.completedIndex < this.build.length - 1) {
      this.workflowSteps.next();
      this.executeWorkflow();
    }
  }
}
