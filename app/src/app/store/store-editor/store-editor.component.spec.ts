import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditorComponent } from './store-editor.component';

describe('StoreEditorComponent', () => {
  let component: StoreEditorComponent;
  let fixture: ComponentFixture<StoreEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
