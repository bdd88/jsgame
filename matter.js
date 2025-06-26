import {physicsObject} from './physics.js';

export class matter extends physicsObject {
    name = null;
    state = null;
    color = null;
}

export class solid extends matter {
    sate = "solid";
}

export class granule extends matter {
    state = "granule";
}

export class sand extends matter {
    name = "sand";
    color = "red";
}

export class liquid extends matter {
    state = "liquid";
    spread = 10;
}

export class water extends liquid {
    name = "water";
    color = "blue";
}