import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  exports: [
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class MaterialsModule {}
