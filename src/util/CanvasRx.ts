import { Observable } from 'rxjs';
import * as Rx from 'rxjs/Rx';
import { map } from 'rxjs/operators';

type Point = {x: number, y: number};

export enum CanvasGraphEnum {
  Rect = 1,
  Circle = 2,
  Line = 3,
}

export default class CanvasRx {
  private _canvasClick$: Observable<Event>;
  private _canvasDoubleClick$: Observable<Event>;
  private _ctx: CanvasRenderingContext2D;
  private _canvasDOM: HTMLCanvasElement;
  private _currentCanvasType: CanvasGraphEnum = CanvasGraphEnum.Rect;

  constructor(canvasDOM: HTMLCanvasElement) {
    this._canvasDOM = canvasDOM;
    this._canvasClick$ = Rx.Observable.fromEvent(canvasDOM, 'click');
    this._canvasDoubleClick$ = Rx.Observable.fromEvent(canvasDOM, 'dblclick');
    this._ctx = <CanvasRenderingContext2D>canvasDOM.getContext('2d');
  }

  initial() {
    // this._ctx.fillRect(36, 29, 100, 100);
    // this._ctx.beginPath();
    // this._ctx.arc(10, 10, 10, 0, 2 * Math.PI);
    // this._ctx.stroke();
    this._canvasClick$.pipe(
      // debounceTime(1500),
      map((e: MouseEvent) => ({
        x: e.offsetX - this._canvasDOM.clientLeft,
        y: e.offsetY - this._canvasDOM.clientTop,
      })),
    ).subscribe(e => {
      console.log(e);
      // this._ctx.;
      // this.moveTo(e as Point);
      // this.renderRect(e as Point);
      this.render(e as Point);
    });

    this._canvasDoubleClick$.subscribe(e => {
      // do nothing
      console.log('double click');
    })
  }

  moveTo(point: Point) {
    this._ctx.moveTo(point.x, point.y);
  }

  randomFillStyle() {
    const rand = Math.floor(Math.random() * 2);
    this._ctx.fillStyle = !!rand ? `red` : `blue`;
  }

  setType(type: CanvasGraphEnum) {
    if (!(type in CanvasGraphEnum)) {
      throw Error(`error canvas graph type ${type}`);
    }
    this._currentCanvasType = type;
  }

  clearAllRect() {
    this._ctx.clearRect(0, 0, this._canvasDOM.width, this._canvasDOM.height);
  }

  renderRect(p: Point) {
    this._ctx.fillRect(p.x, p.y, p.x, p.y);
  }

  renderCircle(radius: number, center: Point) {
    this._ctx.beginPath();
    this._ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    this._ctx.fill();
    this._ctx.stroke();
    // this._ctx.closePath();
  }

  render(p: Point) {
    this.randomFillStyle();
    switch (this._currentCanvasType) {
      case CanvasGraphEnum.Circle:
        this.renderCircle(100, p);
        break;
      case CanvasGraphEnum.Rect:
        this.renderRect(p);
        break;
    }
  }
}