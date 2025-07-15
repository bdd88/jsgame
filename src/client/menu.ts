import { button } from "./gui";
import { menu } from "./gui";

class mainMenu extends menu {

}

export class pauseButton extends button {
        name = 'pause';
        width = 100;
        height = 50;
        color = 'blue';
        fontSize = 15;
        fontType = 'Ariel';
        string = 'Pause';
}