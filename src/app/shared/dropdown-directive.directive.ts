import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]',
})
export class DropdownDirectiveDirective implements OnInit {
  @HostBinding('style.display') display: string;
  @HostListener('click') dropdownButtonClick: () => void = () => {
    this.display = this.display === 'none' ? 'block' : 'none';
  };
  ngOnInit() {
    this.display = 'none';
  }
}
