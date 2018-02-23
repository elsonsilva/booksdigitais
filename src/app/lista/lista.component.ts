import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {MatDialog, MAT_DIALOG_DATA, PageEvent} from '@angular/material';

import { ISearchModel } from '../utils/search-model-interface';
import { IDetalhes } from '../utils/detalhes-interface';
import { HighlightPipe } from '../utils/highlight.pipe';

import { DetalhesComponent } from '../detalhes/detalhes.component';

import { LocalStorage } from '../utils/local-storage.service';
import { Api } from '../utils/api.service';
import { Utils } from '../utils/utils.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {

  value = '';
  // MatPaginator Inputs
  length = 30;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20];
  // MatPaginator Output
  pageEvent: PageEvent;

  apikey = 'AIzaSyBQlOJgngNAX_jzOu_F_nbggmm2CRf9dkQ';

  pendingRequest: any;
  model: ISearchModel;
  resposta: Boolean = false;

  booksData: Array<Object> = [];
  @Output() Selected = new EventEmitter<Array<string>>();

  showLoader: Boolean = false;
  inputError: Boolean = false;
  searchLimitVals: Array<number> = [10, 15, 25];
  sortOrderVals: Array<string> = ['relevance', 'newest'];
  localSortOrderVals: Array<Object> = [{
    'text': 'Por: Nome',
    'sortValue': '+volumeInfo.title'
  }, {
    'text': 'Por: Preço -',
    'sortValue': '-saleInfo.listPrice.amount'
  }, {
    'text': 'Por: Preço +',
    'sortValue': '+saleInfo.listPrice.amount'
  }];

  constructor(public dialog: MatDialog, private api: Api, private LS: LocalStorage, private utils: Utils) {
    this.checkLSForData();
  }

  private checkLSForData() {
    const searchQuery = this.LS.getValue('searchQuery'),
      searchLimit = this.LS.getValue('searchLimit'),
      sortOrder = this.LS.getValue('sortOrder'),
      localSortKey = this.LS.getValue('localSortKey');

    if (!this.utils.isNullUndefined(searchQuery) &&
      !this.utils.isNullUndefined(searchLimit) &&
      !this.utils.isNullUndefined(sortOrder) &&
      !this.utils.isNullUndefined(localSortKey)) {
      this.utils.log('ls value obtained: ', searchQuery);
      this.model = {
        searchQuery: searchQuery,
        searchLimit: searchLimit,
        sortOrder: sortOrder,
        localSortKey: localSortKey
      };
      this.sendSearchRequest();
    } else {
      this.utils.log('ls value not obtained');
      this.model = {
        searchQuery: '',
        searchLimit: '5',
        sortOrder: 'relevance',
        localSortKey: '+volumeInfo.title'
      };
    }
  }

  searchBooks($event: Event) {
    // this.model.searchQuery = this.model.searchQuery.trim();
    // this.resultado = false;
    this.utils.log('searchBooks, searchQuery: ', this.model.searchQuery, ', :searchLimit: ', this.model.searchLimit);
    // if (this.pendingRequest) {
    //   this.pendingRequest = this.pendingRequest.unsubscribe();
    // }

    if (this.model.searchQuery.length > 2) {
      this.sendSearchRequest();
      this.inputError = false;
    } else {
      this.inputError = true;
      if (this.model.searchQuery.length === 0) {
        this.booksData = [];
      }
    }
    this.LS.setValue({
      'searchQuery': this.model.searchQuery,
      'searchLimit': this.model.searchLimit,
      'sortOrder': this.model.sortOrder,
      'localSortKey': this.model.localSortKey
    });
  }

  sendSearchRequest() {
    this.showLoader = true;
    this.resposta = true;
    // tslint:disable-next-line:max-line-length
    // this.pendingRequest = this.api.getData('https://www.googleapis.com/books/v1/volumes?q=' + this.model.searchQuery + '&hl=pt-BR&maxResults=' + this.model.searchLimit + '&orderBy=' + this.model.sortOrder + '&key=AIzaSyBQlOJgngNAX_jzOu_F_nbggmm2CRf9dkQ').
    // tslint:disable-next-line:max-line-length
    this.pendingRequest = this.api.getData('https://www.googleapis.com/books/v1/volumes?q=' + this.model.searchQuery + '&hl=pt-BR&maxResults=' + '5' + '&orderBy=' + this.model.sortOrder + '&key=AIzaSyBQlOJgngNAX_jzOu_F_nbggmm2CRf9dkQ').

    subscribe(
        // data => console.log(data),
        data => this.booksData = data.items,
        // data => this.booksData = data.items,
        error => console.error('Error: ' + error),
    );
  }

  openDialog(bookData) {
    this.Selected.emit(bookData);
    this.dialog.open(DetalhesComponent, {
      data: {
        titulo: bookData.volumeInfo.title,
        subtitulo: bookData.volumeInfo.subtitle,
        imagem: bookData.volumeInfo.imageLinks.smallThumbnail,
        descricao: bookData.volumeInfo.description
      },
      height: '560px',
      width: '440px'
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

}




