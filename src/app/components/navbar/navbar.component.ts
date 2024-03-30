import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() public options: string[] = [];
  @Input() public selected: number | null = 0;
  @Output() public selectedChange = new EventEmitter<number | null>();
  constructor() {}

  ngOnInit(): void {}

  select(i: number): void {
    this.selected = i;
    this.selectedChange.emit(this.selected);
  }
}
