import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { SnackComponent } from '../snack/snack.component';

import { LocalStorage } from '../utils/local-storage.service';
import { Api } from '../utils/api.service';
import { Utils } from '../utils/utils.service';

import { ISearchModel } from '../utils/search-model-interface';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  pendingRequest: any;
  model: ISearchModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private LS: LocalStorage, public snackBar: MatSnackBar) {}

  ngOnInit() {

  }

  addFavorito(data) {
    this.snackBar.openFromComponent(SnackComponent, {
      duration: 600,
    });
    this.LS.setValue ({
      'titulo': this.data.titulo
    });
  }


}






