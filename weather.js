export class weather {
    type = "weather";
}

export class snowstorm extends weather {
    name = "snowstorm";
    material = "snow";
    frequency = 1;
}

export class rainstorm extends weather {
    name = "rainstorm";
    material = "water";
    frequency = 2;
}