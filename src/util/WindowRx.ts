import { Observable, OperatorFunction } from 'rxjs';
import * as Rx from 'rxjs/Rx';
import { zip, map, debounceTime, distinctUntilChanged, concat, merge } from 'rxjs/operators';

export default class WindowRx {

  private _window: Window;
  private _windowResize$: Observable<Event>;
  private _windowOnLoad$: Observable<Event>;
  private _pipeList: OperatorFunction<any,any>[];
  constructor(window: Window) {
    this._window = window;
    this._windowResize$ = Rx.Observable.fromEvent(window, 'resize');
    this._windowOnLoad$ = Rx.Observable.fromEvent(window, 'load');
    this._pipeList = [
      debounceTime(500),
      distinctUntilChanged(),
      map((e: Event) => this._window.innerWidth),
    ]
  }

  initial(cb: Function) {
    this._windowResize$.pipe(
      merge(this._windowOnLoad$),
      ...this._pipeList
    ).subscribe(windowWidth => {
      console.log('window subscribe');
      cb(windowWidth);
    });
  }

}