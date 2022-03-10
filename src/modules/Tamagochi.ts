export class Tamagochi {
    private readonly name: string;
    private readonly type: string;
    private happiness: number;
    private hunger: number;
    private poopcounter: number[];
    private interval: Function;

    constructor() {
        let names: string[] = [
            'Otto',
            'Sven',
            'Anna',
            'Fredrik',
            'Adolf',
            'Selena',
            'Naja',
            'Jimmy',
        ];
        let types: string[] = [
            'Hund',
            'Kanin',
            'Katt',
            'Hamster',
            'Drake',
            'Tiger',
        ];

        this.name = names[Math.floor(Math.random() * names.length)];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.happiness = 5;
        this.hunger = 5;
        this.poopcounter = [];
        this.interval = function () {
            return setInterval(this.removeHappiness.bind(this), 3000);
        };
    }
    feed(): void {
        if (this.hunger === 0) {
            this.removeHappiness;
        } else {
            this.hunger--;
            this.poop();
        }
        this.updateDisplay();
    }
    play(): void {
        if (this.happiness === 10) {
            this.hunger++;
            if (this.hunger === 10) {
                this.die('Hunger');
            }
        } else {
            this.happiness++;
        }
        this.updateDisplay();
    }
    poop(): void {
        if (Math.random() < 0.5) {
            this.poopcounter.push(this.interval(), 1000);
        }
    }
    removeHappiness(): void {
        this.happiness--;
        if (this.happiness === 0) {
            this.die('Glädje');
        }
        this.updateDisplay();
    }
    cleanthepopo(): void {
        clearInterval(this.poopcounter[0]);
        this.poopcounter.splice(0, 2);
        this.updateDisplay();
    }

    die(reason) {
        alert(
            `FÖR FAAANNN...Nu är den död, Du tog inte hand om den, Inte tillräckligt med uppmärksamhet på: ${reason}`
        );
        window.location.reload();
    }
    updateDisplay() {
        console.table(
            this.name,
            this.type,
            this.hunger,
            this.happiness,
            this.poopcounter
        );
        let typeDisplay = document.querySelector('.type');
        typeDisplay.innerHTML = `typ: ${this.type}`;

        let nameDisplay = document.querySelector('.name');
        nameDisplay.innerHTML = `Namn: ${this.name}`;

        let happinessDisplay = document.querySelector('.happiness');
        happinessDisplay.innerHTML = `Glädje: ${this.happiness}`;

        let hungerDisplay = document.querySelector('.hunger');
        hungerDisplay.innerHTML = `Hunger: ${this.hunger}`;

        let cleanDisplay = document.querySelector('.clean');
        let clean;
        if (this.poopcounter[0]) clean = 'Nej';
        else clean = 'JA';
        cleanDisplay.innerHTML = `Tog du bort skiten: ${clean}`;
    }
}