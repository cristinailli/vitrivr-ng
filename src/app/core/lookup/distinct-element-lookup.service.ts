import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CineastRestAPI} from '../api/cineast-rest-api.service';
import {ConfigService} from '../basics/config.service';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * This service provides access to the Tags stored and exposed by Cineast through the Cineast RESTful API. Tags can be
 * used for Tag based (boolean) lookup.
 */
@Injectable()
export class DistinctElementLookupService extends CineastRestAPI {

  private cache = {};

  constructor(@Inject(ConfigService) _configService: ConfigService, @Inject(HttpClient) _httpClient: HttpClient) {
    super(_configService, _httpClient);
  }

  /**
   * Returns all distinct strings for a given column.
   */
  public getDistinct(table: string, column: string): Observable<string[]> {
    if (this.cache[table + column]) {
      return new BehaviorSubject(this.cache[table + column])
    }
    return this.post<DistinctElementResult>('find/boolean/column/distinct', new ColumnSpecification(table, column)).pipe(first()).map(res => {
      this.cache[table + column] = res.distinctElements;
      return res.distinctElements
    });
  }
}

class ColumnSpecification {
  constructor(public table: string, public column: string) {
  }
}

class DistinctElementResult {
  public queryId: string;
  public distinctElements: string[];
}
