import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

import { Socket, io } from 'socket.io-client';

import { ISocketMessage } from '@commons/structures';

@Component({
  selector: 'app-execution-status',
  templateUrl: './execution-status.component.html',
  styleUrls: ['./execution-status.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ExecutionStatusComponent implements OnInit {
  @ViewChild('logs', { static: false }) logs: ElementRef;

  private socket: Socket;

  public messages: Array<ISocketMessage>;
  public status: number = 0;

  constructor() {
    this.messages = [];
  }

  ngOnInit(): void {
    this.socket = io('http://localhost:8001', {
      path: '/build/status'
    });
    this.socket.on('progress', (message) => {
      this.logMessage(message);
    });
    this.socket.on('message', (message) => {
      this.logMessage(message);
    });
    this.socket.on('error', (message) => {
      this.status = -1;
      this.logMessage(message);
    });
    this.socket.on('completed', (message) => {
      this.status = 1;
      this.logMessage(message);
    });
    this.socket.on('started', (message) => {
      this.status = 0;
      this.logMessage(message);
    });
  }

  private logMessage(message: ISocketMessage): void {
    this.messages.push(message);
    this.logs.nativeElement.scrollTop = this.logs.nativeElement.scrollHeight;
  }
}
