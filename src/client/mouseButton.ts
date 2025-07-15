export class mouseButton {
    name: string = '';
    pressed: boolean = false;
    pressX: number = 0;
    pressY: number = 0;
    pressTime: number = 0;
    pressCallback: Function = Function();
    pressCallbackArgs: Array<any> = [];
    releaseX: number = 0;
    releaseY: number = 0;
    releaseTime: number = 0;
    releaseCallback: Function = Function();
    releaseCallbackArgs: Array<any> = [];

    constructor() {

    }
}