import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigsEditorComponent } from './configs-editor.component';

describe('ConfigsEditorComponent', () => {
  let component: ConfigsEditorComponent;
  let fixture: ComponentFixture<ConfigsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
