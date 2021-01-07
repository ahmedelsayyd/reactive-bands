import { Component } from '@angular/core';

import { BandDataService } from '../band-data.service';
import { Band } from '../model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map, mergeMap, startWith, combineLatest } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
<<<<<<< HEAD
import { BehaviorSubject } from 'rxjs';
=======
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { UserDataService } from '../user-data.service';
>>>>>>> f02a40c38d3a539624f61a2d10afa423137f5963

@Component({
  selector: 'app-band-list',
  templateUrl: 'band-list.component.html'
})
export class BandListComponent {
  refreshDataClickSubject = new Subject();

  model$: Observable<{bands: Band[], isLoading: boolean}>;
  //model$: Observable<Band[]>;

<<<<<<< HEAD
  constructor(private bandDataService: BandDataService) {

    const refreshDataClick$ = this.refreshDataClickSubject.asObservable()
    
=======
  constructor(
    private bandDataService: BandDataService,
    private userDataService: UserDataService,
    private activedRoute: ActivatedRoute
  ) {
    const refreshDataClick$ = this.refreshDataClickSubject.asObservable();
>>>>>>> f02a40c38d3a539624f61a2d10afa423137f5963
    const refreshTrigger$ = refreshDataClick$.pipe(
      startWith({}),
      combineLatest(activedRoute.queryParams),
      map(([_, params]) => {
        if (params.active === undefined) return undefined;
        return params.active === "true";
      })
    );
<<<<<<< HEAD
  
     const bandList$ = refreshTrigger$.pipe(
       mergeMap(() => this.bandDataService.getBands())
     );
=======
    const bandList$ = refreshTrigger$.pipe(
      mergeMap(active => forkJoin(
        this.bandDataService.getBands(active),
        this.userDataService.currentUser
      )),
      map(([bands, currentUser]) => 
        bands.map(band => band.id === currentUser.favoriteBandId
          ? { ...band, favorite: true }
          : band 
        )
    ));
>>>>>>> f02a40c38d3a539624f61a2d10afa423137f5963

     this.model$ = merge(
      refreshTrigger$.pipe(map(() => ({ bands: [], isLoading: true }))),
       bandList$.pipe(map(bands => ({ bands: bands, isLoading: false }))),
     )



    // this.model$ = refreshDataClick$.pipe(
    //   startWith({}),
    //   mergeMap(() => this.bandDataService.getBands())
    // ) 
  }
}
