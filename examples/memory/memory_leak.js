const leaks = []

function LeakingClass() {
  this.name = Math.random().toString(36)
  this.age = Math.floor(Math.random() * 100)
}

setInterval(() => {
  for (let i = 0; i < 100000; i++) {
    leaks.push(new LeakingClass())
  }

  console.warn('Leaks: %d', leaks.length)
}, 100)