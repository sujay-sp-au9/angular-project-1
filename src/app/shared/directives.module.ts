import { NgModule } from '@angular/core';
import { DropdownDirectiveDirective } from './dropdown-directive.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
  declarations: [DropdownDirectiveDirective, PlaceholderDirective],
  exports: [DropdownDirectiveDirective, PlaceholderDirective],
})
export class DirectivesModule {}
