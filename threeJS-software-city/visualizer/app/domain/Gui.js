import * as dat from 'dat.gui';

export class GUI {
    constructor(group, highestBuilding) {
        this.gui = new dat.GUI();
        this.options = {
            thresholdValue: 0,
            thresholdColor: '#FF0000'
        }

        this.gui.add(this.options, 'thresholdValue', 0, highestBuilding).onChange(value => {
            this.options.thresholdValue = value;
            group.children.forEach(e => {
                if (e.scale.y >= this.options.thresholdValue) {
                    e.material.color.set(this.options.thresholdColor);
                }
            });
        });

        this.gui.addColor(this.options, 'thresholdColor').onChange(color => {
            this.options.thresholdColor = color;
            group.children.forEach(e => {
                if (e.scale.y >= this.options.thresholdValue) {
                    e.material.color.set(this.options.thresholdColor);
                }
            });
        });
    }
}