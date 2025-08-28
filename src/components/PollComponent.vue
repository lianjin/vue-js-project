<template>
  <div class="poll-container">
    <h2>{{ poll.question }}</h2>
    <div v-if="!hasVoted">
      <div v-for="(option, index) in poll.options" :key="index" class="poll-option">
        <input type="radio" :id="'option-' + index" :value="option.text" v-model="selectedOption">
        <label :for="'option-' + index">{{ option.text }}</label>
      </div>
      <button @click="submitVote" :disabled="!selectedOption">Vote</button>
    </div>
    <div v-else class="poll-results">
      <h3>Results:</h3>
      <div v-for="(option, index) in poll.options" :key="index" class="result-item">
        <span>{{ option.text }}: </span>
        <span>{{ option.votes }} votes ({{ calculatePercentage(option.votes) }}%)</span>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: calculatePercentage(option.votes) + '%' }"></div>
        </div>
      </div>
      <p>Total Votes: {{ totalVotes }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PollComponent',
  data() {
    return {
      poll: {
        question: 'What is your favorite frontend framework?',
        options: [
          { text: 'Vue.js', votes: 0 },
          { text: 'React', votes: 0 },
          { text: 'Angular', votes: 0 },
          { text: 'Svelte', votes: 0 }
        ]
      },
      selectedOption: null,
      hasVoted: false
    };
  },
  computed: {
    totalVotes() {
      return this.poll.options.reduce((sum, option) => sum + option.votes, 0);
    }
  },
  methods: {
    submitVote() {
      if (this.selectedOption) {
        const option = this.poll.options.find(opt => opt.text === this.selectedOption);
        if (option) {
          option.votes++;
          this.hasVoted = true;
        }
      }
    },
    calculatePercentage(votes) {
      if (this.totalVotes === 0) return 0;
      return ((votes / this.totalVotes) * 100).toFixed(1);
    }
  }
};
</script>

<style scoped>
.poll-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 25px;
}

.poll-option {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.poll-option input[type="radio"] {
  margin-right: 10px;
  transform: scale(1.2);
}

.poll-option label {
  font-size: 1.1em;
  color: #555;
  cursor: pointer;
}

button {
  display: block;
  width: 100%;
  padding: 12px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

button:hover:not(:disabled) {
  background-color: #369f6e;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.poll-results {
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.poll-results h3 {
  color: #333;
  margin-bottom: 15px;
}

.result-item {
  margin-bottom: 10px;
  font-size: 1.05em;
  color: #555;
}

.progress-bar-container {
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 15px;
  margin-top: 5px;
  overflow: hidden;
}

.progress-bar {
  background-color: #42b983;
  height: 100%;
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
}

.poll-results p {
  margin-top: 20px;
  font-weight: bold;
  color: #333;
  text-align: right;
}
</style>
