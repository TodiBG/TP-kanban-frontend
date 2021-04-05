import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { UserComponent } from './components/user/user.component';
import { FicheComponent } from './components/fiche/fiche.component';
import { TagComponent } from './components/tag/tag.component';
import { TableauComponent } from './components/tableau/tableau.component';
import { SectionComponent } from './components/section/section.component';
import { HomeComponent } from './components/home/home.component';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';

import { TabViewModule } from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';    
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu'; 
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FicheComponent,
    TagComponent,
    TableauComponent,
    SectionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToolbarModule,
    TabViewModule,
    ButtonModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatTableModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatMenuModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    FileUploadModule,
    InputTextModule,
    ProgressBarModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    RatingModule,
    RadioButtonModule,
    ConfirmDialogModule,
    InputNumberModule,
  ],

  
  providers: [
    ConfirmationService,
    MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
