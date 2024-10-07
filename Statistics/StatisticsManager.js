export class StatisticsManager {
    constructor() {
        this.numSolves = 0;
        this.sumCrossMoves = 0;
        this.sumLLMoves = 0;
        this.sumTotalMoves = 0;
        this.numOfOllSkips = 0;
        this.numOfLLSkips = 0;
    }

    notifyStartSolve() {
        this.numSolves++;
    }

    notifyNumberOfCrossMoves(n) {
        this.sumCrossMoves += n;
    }

    notifyNumberOfLLMoves(n) {
        this.sumLLMoves += n;
    }

    notifyNumberOfTotalMoves(n) {
        this.sumTotalMoves += n;
    }

    notifyOllSkip() {
        this.numOfOllSkips++;
    }

    notifyLLSkip() {
        this.numOfLLSkips++;
    }

    getAvgNumOfCrossMoves() {
        return this.sumCrossMoves / this.numSolves;
    }

    getAvgNumOfLLMoves() {
        return this.sumLLMoves / this.numSolves;
    }

    getAvgNumOfMoves() {
        return this.sumTotalMoves / this.numSolves;
    }

    getChanceForOllSkip() {
        return parseFloat(this.numOfOllSkips) / parseFloat(this.numSolves);
    }

    getChanceForLLSkip() {
        return parseFloat(this.numOfLLSkips) / parseFloat(this.numSolves);
    }
}