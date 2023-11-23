export class ListOfBuildings {
    constructor() {
        this.list = [];
    }

    addBuilding(building) {
        this.list.push(building);
    }

    getHighestBuilding() {
        let max = 0;
        this.list.forEach(building => {
            if (building.getHeight() >= max) {
                max = building.getHeight();
            }
        })
        return max;
    }

}