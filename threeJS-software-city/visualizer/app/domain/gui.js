import * as dat from 'dat.gui';

export class GUI {
    constructor(group, highestBuilding) {
        const gui = new dat.GUI();
        const options = {
            thresholdValue: 0,
            thresholdColor: '#FF0000'
        }

        gui.add(options, 'thresholdValue', 0, highestBuilding).onChange(value => {
            options.thresholdValue = value;
            group.children.forEach(e => {
                if (e.scale.y * 10 >= options.thresholdValue) {
                    e.material.color.set(options.thresholdColor);
                }
            });
        });

        gui.addColor(options, 'thresholdColor').onChange(color => {
            options.thresholdColor = color;
            group.children.forEach(e => {
                if (e.scale.y * 10 >= options.thresholdValue) {
                    e.material.color.set(options.thresholdColor);
                }
            });
        });
    }
}