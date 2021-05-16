import { Component, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StoreEditorComponent } from './store-editor/store-editor.component'

import { Constants } from '@commons/constants';
import { IStoreRecord, IHttpServiceParams } from '@commons/structures';
import { HttpService } from '@services/http.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers: [HttpService]
})
export class StoreComponent implements AfterViewInit {
  public displayedColumns: string[];
  public data: Array<IStoreRecord>;
  public dataSource: MatTableDataSource<IStoreRecord>;

  constructor(
    public dialog: MatDialog,
    public http: HttpService<IStoreRecord>
  ) {
    this.displayedColumns = ['name', 'value', 'isSecret', 'edit'];
    this.bindData([{
      name: '',
      value: '',
      isSecret: false
    }]);
  }

  public ngAfterViewInit(): void {
    this.fetch();
  }

  public onEditRow(idx) {
    this.openDialog(this.data[idx]);
  }

  public onAddNew(): void {
    this.openDialog({
      name: '',
      value: '',
      isSecret: false
    });
  }

  private openDialog(data: IStoreRecord): void {
    const dialogRef = this.dialog.open(StoreEditorComponent, {
      width: '580px',
      data: data
    });

    dialogRef.afterClosed().subscribe((record: IStoreRecord) => {
      if (record && record.name) {
        if (record.isDelete) {
          this.deleteRecord(record);
        } else if (record._id) {
          this.updateRecord(record);
        } else {
          this.insertRecord(record);
        }
      }
    });
  }

  private bindData(data: Array<IStoreRecord>): void {
    this.data = data;
    this.dataSource = new MatTableDataSource<IStoreRecord>(this.data);
  }

  private fetch(): void {
    let params: IHttpServiceParams<IStoreRecord> = {
      url: Constants.STORE_URL
    };

    this.http
      .doGet(params)
      .then(data => {
        this.bindData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  private deleteRecord(record: IStoreRecord): void {
    let params: IHttpServiceParams<IStoreRecord> = {
      url: Constants.STORE_URL + `/id/${record._id}`
    };

    this.http
      .doDelete(params)
      .then(data => {
        console.log('Deleted Successfully', data);
        this.fetch();
      })
      .catch(error => {
        console.error(error);
      });
  }

  private insertRecord(record: IStoreRecord): void {
    delete record['_id'];

    let params: IHttpServiceParams<IStoreRecord> = {
      url: Constants.STORE_URL,
      formData: record
    };

    this.http
      .doPost(params)
      .then(data => {
        console.log('Saved Successfully', data);
        this.fetch();
      })
      .catch(error => {
        console.error(error);
      });
  }

  private updateRecord(record: IStoreRecord): void {
    let params: IHttpServiceParams<IStoreRecord> = {
      url: Constants.STORE_URL + `/id/${record._id}`,
      formData: record
    };

    this.http
      .doPut(params)
      .then(data => {
        console.log('Saved Successfully', data);
        this.fetch();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
