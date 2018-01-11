import { Component, OnInit, Input, Output, ElementRef, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit 
{
  show = false;
  hide = true;

  @Input()
  question: string;

  @Output()
  OnConfirm = new EventEmitter<boolean>();

  @ViewChild("confirm")
  confirm: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public ShowConfirmation()
  {
    this.confirm.nativeElement.style.display = "block";
  }

  public No()
  {
    this.OnConfirm.emit(false);
    this.confirm.nativeElement.style.display = "none";
  }

  public Yes()
  {
    this.OnConfirm.emit(true);
    console.log("emit yes");
    this.confirm.nativeElement.style.display = "none";
  }

}
