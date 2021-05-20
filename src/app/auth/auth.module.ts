import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../shared/components.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [ComponentsModule, CommonModule, ReactiveFormsModule],
  exports: [AuthComponent],
})
export class AuthModule {}
