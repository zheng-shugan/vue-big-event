<template>
  <div class="shulte-table">
    <table>
      <tbody>
      <tr v-for="(row, rowIndex) in table" :key="rowIndex">
        <td
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          @click="handleCellClick(cell)"
          :class="{ 'cell-selected': cell.selected }"
        >
          {{ cell.value }}
        </td>
      </tr>
      </tbody>
    </table>
    <div class="timer">{{ secondsElapsed }}s</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: [],
      cellCount: 25,
      secondsElapsed: 0,
      timerInterval: null,
    };
  },
  mounted() {
    this.generateTable();
  },
  methods: {
    generateTable() {
      // generate an array of numbers from 1 to cellCount
      const numbers = Array.from({ length: this.cellCount }, (_, i) => i + 1);

      // shuffle the array randomly
      numbers.sort(() => Math.random() - 0.5);

      // convert the shuffled array into a 2D array of cells
      this.table = [];
      for (let i = 0; i < 5; i++) {
        this.table.push(numbers.slice(i * 5, i * 5 + 5).map((n) => ({ value: n, selected: false })));
      }
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.secondsElapsed++;
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timerInterval);
    },
    handleCellClick(cell) {
      if (cell.value === 1) {
        // start the timer on first click
        if (this.secondsElapsed === 0) {
          this.startTimer();
        }

        // mark the cell as selected
        cell.selected = true;

        // check if all cells are selected
        if (this.table.flat().every((cell) => cell.selected)) {
          this.stopTimer();
          alert(`You completed the game in ${this.secondsElapsed} seconds!`);
          this.generateTable();
          this.secondsElapsed = 0;
        }
      }
    },
  },
};
</script>

<style scoped>
.shulte-table {
  display: flex;
  flex-direction: column;
  align-items: center;
}

table {
  border-collapse: collapse;
  margin-bottom: 20px;
}

td {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  text-align: center;
  vertical-align: middle;
  font-size: 24px;
  cursor: pointer;
}

.cell-selected {
  background-color: gray;
}

.timer {
  font-size: 24px;
}
</style>
