import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ISearchModel } from '../utils/search-model-interface';
import { HighlightPipe } from '../utils/highlight.pipe';
// import { CollapseTitle } from '../directives/collapse-title.directive';

// import { _settings } from '../helpers/settings';
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
  length = 100;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];
  apikey = 'AIzaSyBQlOJgngNAX_jzOu_F_nbggmm2CRf9dkQ';
  url1 = 'https://www.googleapis.com/books/v1/volumes?q=';

  pendingRequest: any;
  model: ISearchModel;
  resposta = '';

  booksData: Array<Object> = [];

  showLoader: Boolean = false;
  inputError: Boolean = false;
  searchLimitVals: Array<number> = [10, 20, 30, 40];
  sortOrderVals: Array<string> = ['relevance', 'newest'];
  localSortOrderVals: Array<Object> = [{
    'text': 'By: Name',
    'sortValue': '+volumeInfo.title'
  }, {
    'text': 'By: Price Descending',
    'sortValue': '-saleInfo.listPrice.amount'
  }, {
    'text': 'By: Price Ascending',
    'sortValue': '+saleInfo.listPrice.amount'
  }];

  constructor(private api: Api, private LS: LocalStorage, private utils: Utils) {
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
        searchLimit: '10',
        sortOrder: 'relevance',
        localSortKey: '+volumeInfo.title'
      };
    }
  }

  searchBooks($event: Event) {
    // this.model.searchQuery = this.model.searchQuery.trim();

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
    // this.pendingRequest =
    // tslint:disable-next-line:max-line-length
    // this.pendingRequest = this.api.getData('url1' + this.model.searchQuery + '&maxResults=' + this.model.searchLimit + '&orderBy=' + this.model.sortOrder + '&key=' + this.apikey).
    // delay(500).
    // tslint:disable-next-line:max-line-length
    this.pendingRequest = this.api.getData('https://www.googleapis.com/books/v1/volumes?q=' + this.model.searchQuery + '&maxResults=' + this.model.searchLimit + '&orderBy=' + this.model.sortOrder + '&key=AIzaSyBQlOJgngNAX_jzOu_F_nbggmm2CRf9dkQ').

      subscribe(
        // data => console.log(data),
        data => this.booksData = data.items,
        error => console.error('Error: ' + error)
       //  data => console.log(data)
      // data => data
      // ,error => console.error('Error: ' + error),
      // () => this.sortData()
    );
  }


  // sortData($event?: Event) {
  //   this.showLoader = false;

  //   let sortkey = this.model.localSortKey,
  //     sortDirection = 1;

  //   if (sortkey.indexOf('-') > 0) {
  //     sortkey = sortkey.replace(/-/, '');
  //     sortDirection = -1;
  //   } else {
  //     sortkey = sortkey.replace(/\+/, '');
  //     sortDirection = 1;
  //   }
  //   if (!this.utils.isNullUndefined(this.booksData)) {
  //     this.utils.sortArrayObject(sortkey, this.booksData, sortDirection);
  //   }
  // }
}

