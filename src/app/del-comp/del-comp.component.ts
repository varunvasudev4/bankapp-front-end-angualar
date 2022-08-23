import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-del-comp',
  templateUrl: './del-comp.component.html',
  styleUrls: ['./del-comp.component.css']
})
export class DelCompComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() item:string|undefined

  @Output() onCancel = new EventEmitter()

  @Output() onConfirm = new EventEmitter()

  cancel(){
    this.onCancel.emit()
  }
  confirm(){
    this.onConfirm.emit(this.item)
  }
}
